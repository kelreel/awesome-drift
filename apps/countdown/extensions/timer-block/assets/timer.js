// @ts-check
(function () {
    const ONE_DAY_MS = 86400000

    const showElement = (element) => {
        if (element) {
            element.classList.remove('gta__hidden')
        }
    }

    const hideElement = (element) => {
        if (element) {
            element.classList.add('gta__hidden')
        }
    }

    const STORAGE_KEY = 'gsc-timer'

    class TimerStorage {
        constructor(blockId) {
            this._blockId = blockId
        }

        parseData(data) {
            try {
                const obj = JSON.parse(data ?? '{}')

                if ('endDate' in obj && 'hash' in obj) {
                    return {
                        endDate: new Date(+obj.endDate),
                        hash: obj.hash
                    }
                }

                return null
            } catch (error) {
                return null
            }
        }

        saveData(data) {
            try {
                localStorage.setItem(`${STORAGE_KEY}-${this._blockId}`, JSON.stringify({ endDate: data.endDate.getTime(), hash: data.hash }))
            } catch (e) { }
        }

        loadData() {
            try {
                return this.parseData(localStorage.getItem(`${STORAGE_KEY}-${this._blockId}`))
            } catch (e) {
                return null
            }
        }
    }

    const Mode = {
        Fixed: 'fixed',
        Evergreen: 'evergreen'
    }

    const FinishStrategy = {
        None: 'none',
        Hide: 'hide',
        Restart: 'restart',
        WaitOneDay: 'wait_one_day'
    }

    const getEvergreenEndDate = (unit, value) => {
        const date = new Date()
        switch (unit) {
            case 'day':
                date.setDate(date.getDate() + value)
                break
            case 'hour':
                date.setHours(date.getHours() + value)
                break
            case 'minute':
                date.setMinutes(date.getMinutes() + value)
                break
            case 'second':
                date.setSeconds(date.getSeconds() + value)
                break
        }
        return date
    }

    class CountdownTimer extends HTMLElement {
        mode = Mode.Fixed
        endDate = new Date()
        finishStrategy = FinishStrategy.None

        constructor() {
            super()
            this._daysUnit = this.querySelector('[data-timer-days]')
            this._hoursUnit = this.querySelector('[data-timer-hours]')
            this._minutesUnit = this.querySelector('[data-timer-minutes]')
            this._secondsUnit = this.querySelector('[data-timer-seconds]')

            this.evergreenUnit = this.dataset.evergreenUnit ?? 'minute'
            this.evergreenValue = parseInt(this.dataset.evergreenValue ?? '0')

            this.mode = this.dataset.mode
            if (this.mode === Mode.Fixed) {
                this.finishStrategy = this.dataset.hideOnComplete === 'true' ? FinishStrategy.Hide : FinishStrategy.None
            }

            if (this.mode === Mode.Evergreen) {
                this.finishStrategy = this.dataset.evergreenOnComplete
                this.timerStorage = new TimerStorage(this.dataset.blockId ?? this.id)
            }
        }

        connectedCallback() {
            this.start()
        }

        disconnectedCallback() {
            clearInterval(this.timerRef)
        }

        getHash() {
            return `${this.finishStrategy}-${this.evergreenUnit}-${this.evergreenValue}`
        }

        start() {
            if (this.mode === Mode.Fixed) {
                const endDate = this.dataset.endDate;
                const endTime = this.dataset.endTime;

                let d = new Date();
                d.setDate(d.getDate() + 1)
                d.setHours(0, 0, 0, 0)

                if (endDate && endDate.match(/\d{4}\-\d{1,2}\-\d{1,2}$/)) {
                    d = new Date(endDate)
                }

                if (endTime && endTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
                    const [hours, minutes] = endTime.split(':')
                    d.setHours(+hours)
                    d.setMinutes(+minutes)
                }

                this.endDate = d;
            }

            if (this.mode === Mode.Evergreen) {
                const timerData = this.timerStorage.loadData()
                if (!timerData || timerData.hash !== this.getHash()) {
                    this.updateEvergreenData()
                } else {
                    this.endDate = timerData.endDate
                }
            }

            this.timerRef = setInterval(this.tick.bind(this), 1000)
            this.tick()
        }

        updateEvergreenData() {
            const endDate = getEvergreenEndDate(this.evergreenUnit, this.evergreenValue)
            this.timerStorage.saveData({ endDate, hash: this.getHash() })
            this.endDate = endDate
        }

        finish() {
            clearInterval(this.timerRef)
            switch (this.finishStrategy) {
                case FinishStrategy.Restart:
                    this.timerStorage.saveData({ endDate: getEvergreenEndDate(this.evergreenUnit, this.evergreenValue), hash: this.getHash() })
                    this.start()
                    break
                case FinishStrategy.WaitOneDay:
                    if (new Date().getTime() - this.endDate.getTime() > ONE_DAY_MS) {
                        const endDate = getEvergreenEndDate(this.evergreenUnit, this.evergreenValue)
                        this.timerStorage.saveData({ endDate, hash: this.getHash() })
                        this.start()
                    } else {
                        this.hide()
                    }
                    break
                default:
                    this.hide()
            }
        }

        renderTime(days, hours, minutes, seconds) {
            if (
                !this._daysUnit ||
                !this._hoursUnit ||
                !this._minutesUnit ||
                !this._secondsUnit
            ) {
                return
            }
            this._daysUnit.innerText = days.toString()
            this._hoursUnit.innerText = hours.toString()
            this._minutesUnit.innerText = minutes.toString()
            this._secondsUnit.innerText = seconds.toString()
        }

        tick() {
            const diff = this.endDate.getTime() - new Date().getTime()

            if (diff > 0) {
                this.show()
                this.renderTime(Math.floor(diff / (1000 * 60 * 60 * 24)), Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), Math.floor((diff % (1000 * 60)) / 1000))
                return
            }

            this.renderTime(0, 0, 0, 0)
            this.finish()

            if (window.Shopify.designMode) {
                this.show()
            }
        }

        show() {
            showElement(this)
            if (this.dataset.blockId) {
                showElement(document.querySelector(`.block-${this.dataset.blockId}`))
                showElement(document.querySelector(`.block-${this.dataset.blockId} > .gta__timer-block`)) // section
            }
        }

        hide() {
            if (window.Shopify.designMode) {
                return
            }

            if (this.dataset.blockId) {
                hideElement(document.querySelector(`.block-${this.dataset.blockId}`))
                hideElement(document.querySelector(`.block-${this.dataset.blockId} > .gta__timer-block`))
            }

            hideElement(this)
        }
    }

    if (!customElements.get("gsc-countdown-timer")) {
        customElements.define("gsc-countdown-timer", CountdownTimer);
    }
})()
