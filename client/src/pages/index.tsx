import setTitle from "../utils/setTitle";

const Home = () => {
    setTitle("Home")
    return ( 
        <div className="w-full h-fit">
            <section className="hero_section w-full h-screen flex flex-col">
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-2xl dark:text-white">JWT-AUTH</h1>
            </section>
        </div>
     );
}
 
export default Home;