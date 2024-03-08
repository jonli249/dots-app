import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tooltip,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import SongList from "../../components/songs/songlist";
import Collaborators from "../../components/artist/mostcollabs";
import Navbar from "../../components/main/navbar";
import ArtistSummary from "../../components/artist/artistsummary";
import TwoCollab from "../../components/artist/twocollab";
import Image from "next/image";
import Recomendtion from "../../components/artist/recommendations/Recomendtion";
import DegreesPage from "../../components/artist/degrees/DegreesPage";

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  let { id } = router.query;

  if (Array.isArray(id)) {
    id = id[0];
  }

  useEffect(() => {
    setTabIndex(0);
  }, [id]);

  if (!id) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col mx-auto max-w-[800px] mt-6">
          <div className="flex aic" style={{ gap: 20 }}>
            <SkeletonCircle width={100} height={100} />
            <Skeleton height={7} w={"100px"} />
          </div>
          <Skeleton h={10} mt={16} />
          <div
            className="flex fdc"
            style={{ gap: 10, width: "100%", marginTop: 10 }}
          >
            <div className="flex" style={{ gap: 10, flex: 1 }}>
              <Skeleton fadeDuration={4} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
            </div>
            <div className="flex" style={{ gap: 10, flex: 1 }}>
              <Skeleton fadeDuration={4} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
            </div>
            <div className="flex" style={{ gap: 10, flex: 1 }}>
              <Skeleton fadeDuration={4} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
              <Skeleton fadeDuration={500} style={{ flex: 1, height: 60 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-3 lg:px-0 mx-auto max-w-[800px] mt-6">
        <ArtistSummary artistId={id} />
        <Tabs
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
          variant="unstyled"
          className="mt-6"
        >
          <TabList className="whitespace-nowrap overflow-auto">
            <Tab _selected={{ fontWeight: "bold", color: "black" }}>SONGS</Tab>
            <Tab _selected={{ fontWeight: "bold", color: "black" }}>
              COLLABORATORS
            </Tab>
            <Tab _selected={{ fontWeight: "bold", color: "black" }}>
              SMART TOOLS
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SongList artistId={id} songsPerPage={12} />
            </TabPanel>
            <TabPanel>
              <Collaborators artistId={id} />
            </TabPanel>
            <TabPanel>
              <Image
                src={"/dividerline.png"}
                alt="divider"
                width={800}
                height={10}
              />
              <Tabs variant="unstyled">
                <TabList className="whitespace-nowrap overflow-auto">
                  <Tab _selected={{ fontWeight: "bold", color: "black" }}>
                    RECOMMENDATIONS
                  </Tab>
                  <Tab _selected={{ fontWeight: "bold", color: "black" }}>
                    CONNECT THE DOTS
                  </Tab>
                  <Tab _selected={{ fontWeight: "bold", color: "black" }}>
                    DEGREES
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Recomendtion />
                  </TabPanel>
                  <TabPanel>
                    <TwoCollab artistId={id} />
                  </TabPanel>
                  <TabPanel>
                    <DegreesPage />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistPage;
