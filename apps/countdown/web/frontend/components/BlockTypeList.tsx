import React, { useState } from "react";
import {
  AlphaCard,
  Box,
  Button,
  Grid,
  HorizontalStack,
  Modal,
  Text,
  VerticalStack,
} from "@shopify/polaris";

import BannerImg from "../assets/banner.png";
import BlockImg from "../assets/block.png";
import { useShopData } from "../hooks";

type BlockItem = {
  title: string;
  description: string;
  img: string;
  video: string;
  template: "product" | "home";
};

const youtubeUrlParams = "autoplay=1&showinfo=0&rel=0&loop=1&controls=0&mute=1";

const BLOCKS: BlockItem[] = [
  {
    title: "Countdown timer banner",
    description:
      "Wide banner with background image. Best for home, cart, or collection page.",
    img: BannerImg,
    template: "home",
    video: `https://www.youtube.com/embed/jL3ze2lcs2I?si=P5zaybuu54m2-HRC&${youtubeUrlParams}`,
  },
  {
    title: "Countdown timer",
    description:
      "Small timer with no or solid background. Best for product or other sections.",
    img: BlockImg,
    template: "product",
    video: `https://www.youtube.com/embed/DMY2kz6iOJg?si=3dLj9m2ddcPuWye-&${youtubeUrlParams}`,
  },
];

export const BlockTypeList = () => {
  const { data: shopData } = useShopData();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<BlockItem | null>(null);

  const addToTheme = (template: "product" | "home") => {
    const shop = shopData?.shop.split(".")[0] ?? "";
    const url = `https://admin.shopify.com/store/${shop}/themes/current/editor?template=${template}`;
    window.open(url, "_blank");
  };

  return (
    <Grid>
      {BLOCKS.map((block) => {
        const { title, description, img } = block;
        return (
          <Grid.Cell key={title} columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6 }}>
            <AlphaCard>
              <VerticalStack gap="4">
                <img src={img} alt="Countdown block" />
                <Text variant="headingMd" as="h5" alignment="center">
                  {title}
                </Text>
                <Text variant="bodyMd" as="p" alignment="center">
                  {description}
                </Text>
                <Box>
                  <HorizontalStack align="center">
                    <Button
                      primary
                      onClick={() => {
                        setShowModal(true);
                        setModalContent(block);
                      }}
                    >
                      Add to theme
                    </Button>
                  </HorizontalStack>
                </Box>
              </VerticalStack>
            </AlphaCard>
          </Grid.Cell>
        );
      })}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent?.title}
        primaryAction={{
          content: "Open theme editor",
          onAction: () => addToTheme(modalContent?.template!),
        }}
      >
        <div style={{ padding: "0 0 0" }}>
          <iframe
            width="100%"
            height="420"
            src={modalContent?.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </Modal>
    </Grid>
  );
};
