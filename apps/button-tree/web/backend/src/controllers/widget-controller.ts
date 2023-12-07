import {
  randomString,
  WIDGET_DEFAULT_SETTINGS,
  WidgetSettings,
} from "@blinks/shared";
import { Prisma } from "@prisma/client";
import { Session } from "@shopify/shopify-api";
import { Router } from "express";

import { METAFIELD_NAMESPACE } from "../constants";
import { setAppMetafield } from "../features/metafield";
import { errorLogger } from "../helpers/error-logger";
import { prisma } from "../prisma";

const router = Router();

router.get("/all", async (req, res) => {
  const session = res.locals.shopify.session as Session;

  try {
    const widgets = (
      await prisma.widget.findMany({
        where: { shop: { shop: session.shop } },
        select: {
          id: true,
          name: true,
          key: true,
          config: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      })
    ).map((w) => ({
      ...w,
      buttonCount:
        (w.config as unknown as WidgetSettings)?.buttons?.length || 0,
    }));

    res.send(widgets);
  } catch (e) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while getting widget list",
      data: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  const session = res.locals.shopify.session as Session;

  try {
    const widget = await prisma.widget.findFirstOrThrow({
      where: {
        id: +req.params.id,
        shop: {
          shop: session.shop,
        },
      },
    });

    res.send(widget);
  } catch (e) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while getting widget",
      data: e,
    });
  }
});

router.post("/", async (req, res) => {
  const session = res.locals.shopify.session as Session;

  try {
    const widget = await prisma.widget.create({
      data: {
        name: req.body.name,
        namespace: METAFIELD_NAMESPACE.widget,
        key: randomString(),
        config: WIDGET_DEFAULT_SETTINGS as unknown as Prisma.InputJsonValue,
        shop: {
          connect: {
            shop: session.shop,
          },
        },
      },
    });

    await setAppMetafield(
      session,
      METAFIELD_NAMESPACE.widget,
      widget.key,
      "json",
      JSON.stringify(WIDGET_DEFAULT_SETTINGS),
    );

    console.log(
      `[Widget-Controller]: Create widget "${widget.name}" (ID: ${widget.id}) for ${session.shop}`,
    );

    await res.send(widget);
  } catch (e) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while creating widget",
      data: e,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const session = res.locals.shopify.session as Session;

  const id = parseInt(req.params.id);
  const config = req.body.config;
  const name = req.body.name;

  try {
    if (!config && !name) {
      throw "Widget config or name required";
    }

    // ensure shop is owner of this widget
    await prisma.shop.findFirstOrThrow({
      where: {
        shop: session.shop,
        Widget: {
          some: {
            id,
          },
        },
      },
    });

    const widget = await prisma.widget.update({
      where: {
        id,
      },
      data: {
        name,
        config,
      },
    });

    if (config) {
      await setAppMetafield(
        session,
        METAFIELD_NAMESPACE.widget,
        widget.key,
        "json",
        JSON.stringify(config),
      );
    }

    console.log(
      `[Widget-Controller]: Update widget "${widget.name}" (ID: ${widget.id}) for ${session.shop}`,
    );

    await res.send(widget);
  } catch (e) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while updating widget",
      data: e,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const session = res.locals.shopify.session as Session;

  const id = parseInt(req.params.id);

  try {
    // ensure shop is owner of this widget
    await prisma.shop.findFirstOrThrow({
      where: {
        shop: session.shop,
        Widget: {
          some: {
            id,
          },
        },
      },
    });

    const w = await prisma.widget.delete({
      where: {
        id,
      },
    });

    console.log(
      `[Widget-Controller]: Delete widget "${w.name}" (ID: ${w.id}) for ${session.shop}`,
    );

    await res.send({ deleted: "ok" });
  } catch (e) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while updating widget",
      data: e,
    });
  }
});

export const WidgetController = router;
