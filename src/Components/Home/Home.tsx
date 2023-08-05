import { NavBar } from '../NavBar/NavBar';
// import { useUserProvider } from '../Providers/User.provider';

export const Home = () => {
  // const { user } = useUserProvider();
  return (
    <div className="mainContainer">
      <NavBar />
      {/* <div>{user?.email}</div> */}
      <div>Please Login or Create an Account </div>
    </div>
  );
};
