import React, { useState } from "react";
import MainSection from "../../components/MainSection";
import NavigationBar from "../../components/NavigationBar";
import SideBar from "../../components/SideBar";
import InfoSection from "../../components/InfoSection";
import FeatureSection from "../../components/FeatureSection";
import Footer from "../../components/Footer";
import { IS_Alpha, IS_Exodus, IS_Protector } from "../../images";
import "./LandingPage.scss";
import InfoSection2 from "../../components/InfoSection2";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="landingpage-container">
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <NavigationBar toggleSideBar={toggleSideBar} />
      <MainSection />
      <FeatureSection Id="feature" />
      <InfoSection
        HexColor="#040303"
        Id="collection"
        Img={IS_Alpha}
        Title="Series"
        Headline="Alpha"
        Description="Aliqua commodo eiusmod est quis enim sint nostrud nulla. Deserunt laborum exercitation ut quis sunt. Laboris eiusmod exercitation anim pariatur consequat ad cillum."
      />
      <InfoSection2
        HexColor="#0d0d0d"
        Id="collection2"
        Img={IS_Exodus}
        Title="Series"
        Headline="Exodus"
        Description="Elit aute dolore velit excepteur proident id. In laboris incididunt voluptate aute deserunt fugiat deserunt.Culpa id dolore fugiat in. Tempor non laborum irure fugiat."
      />
      <InfoSection
        HexColor="#040303"
        Id="collection3"
        Img={IS_Protector}
        Title="Series"
        Headline="Protector"
        Description="Do incididunt officia occaecat adipisicing occaecat anim exercitation. Aute dolore aliqua aliquip non ex irure irure id elit esse ea tempor eu ad. Labore aliqua reprehenderit."
      />
      <InfoSection2
        HexColor="#0d0d0d"
        Maps={true}
        Id="findus"
        Title="Find-our"
        Headline="Store"
        Description="Id esse nisi magna sunt sint proident ad in aliqua. Sunt aliquip aute excepteur consequat nulla sint cupidatat qui in officia nostrud esse ullamco adipisicing. Id id do ut nulla consectetur nulla veniam cillum mollit laboris Lorem deserunt. Commodo tempor occaecat adipisicing magna aliqua dolor anim. Do sit esse id sit irure aliquip duis consequat Lorem aliqua."
      />
      <Footer />
    </div>
  );
};

export default LandingPage;
