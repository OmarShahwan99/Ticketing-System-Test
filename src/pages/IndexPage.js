import { useState } from "react";
import { Card } from "antd";
import Tickets from "../components/Tickets/Tickets";
import Services from "../components/Services/Services";

const tabList = [
  {
    key: "tab1",
    tab: "Tickets",
  },
  {
    key: "tab2",
    tab: "Services",
  },
];
const contentList = {
  tab1: <Tickets />,
  tab2: <Services />,
};
const App = () => {
  const [activeTabKey, setActiveTabKey1] = useState("tab1");

  const onTabChange = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};
export default App;
