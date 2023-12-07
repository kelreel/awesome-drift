declare global {
  // eslint-disable-next-line no-var
  var Shopify: {
    designMode?: boolean;
    theme?: any;
    loadFeatures?: (
      features: Array<{ name: string; version: string }>,
      cb: (err?) => void,
    ) => void;
    customerPrivacy?: {
      userCanBeTracked: () => boolean;
      getTrackingConsent: () => string;
      setTrackingConsent: (
        data: Partial<SetTrackingConsent> | boolean,
        cb: () => void,
      ) => void;
      currentVisitorConsent: () => TrackingConsent;
    };
  };
}

export {};
