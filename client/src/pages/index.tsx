import setTitle from "../utils/setTitle";
import Header from "../components/header";
import Button from "../components/button";
import { Link } from "react-router-dom";
import Alert from "components/alert";
import { useContext } from "react";
import { alertContext } from "contexts";

const Home = () => {
  setTitle("Home");
  const alert = useContext(alertContext);

  return (
    <>
      <Header />
      <Alert info={alert.info} setInfo={alert.setInfo} />
      <div className="w-full h-auto flex">
        <section className="hero_section h-screen w-full flex">
          <div
            className={`h-full w-full  bg-[url(https://images.unsplash.com/photo-1618849888041-fe81e92b733e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2Fyc3x8fHx8fDE2OTI4NzY0Mjk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900)] 
        bg-no-repeat bg-center bg-cover`}
          ></div>
        </section>
      </div>
      <section className="w-full h-auto p-10 pt-16 flex flex-col gap-16 lg:gap-28">
        <h3 className="text-black dark:text-white text-center text-[40px] font-bold underline underline-offset-4">
          Our Cars
        </h3>
        <div className="flex lg:flex-row flex-col justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1618205062886-3976f4bb8219?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2Fyc3x8fHx8fDE2OTI4NzcwMjM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
            alt="car"
            width="500"
            height="300"
          />
          <div className="flex flex-col gap-6 p-10">
            <h1 className="text-black dark:text-white text-3xl font-bold">
              Get more out of it
            </h1>

            <p className="text-black dark:text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              neque illo iure ipsam unde odit aspernatur provident! Praesentium
              architecto consequuntur, accusantium debitis veritatis voluptates
              alias porro, dolorum harum temporibus molestiae! Aut voluptatibus
              qui iusto amet, tempore incidunt. Itaque, quas. Animi nemo soluta
              quod corporis nostrum iure odio minima, qui velit mollitia porro
              esse fuga deserunt iusto tempora hic quas? Placeat.
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row-reverse flex-col justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1578475901193-c2ae2b3cd710?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2Fyc3x8fHx8fDE2OTI4Nzc1NDA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
            alt="car"
            width="500"
            height="300"
          />
          <div className="flex flex-col gap-6 p-10">
            <h1 className="text-black dark:text-white text-3xl font-bold">
              Get more out of it
            </h1>

            <p className="text-black dark:text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              neque illo iure ipsam unde odit aspernatur provident! Praesentium
              architecto consequuntur, accusantium debitis veritatis voluptates
              alias porro, dolorum harum temporibus molestiae! Aut voluptatibus
              qui iusto amet, tempore incidunt. Itaque, quas. Animi nemo soluta
              quod corporis nostrum iure odio minima, qui velit mollitia porro
              esse fuga deserunt iusto tempora hic quas? Placeat.
            </p>

            <Button>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button
              onClick={() => {
                alert.setInfo({
                  title: "Hello World!",
                  type: "success",
                  show: true
                });
              }}
            >
              Check
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
