import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

export default function UserProfile() {
  // Redirect away if NOT auth, client side protected route

  // With useSession
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (!session) {
  //   return (
  //     <section className={classes.profile}>
  //       <p>Pleas Login</p>
  //       <Link href={"/auth"}>
  //         <button>Login</button>
  //       </Link>
  //     </section>
  //   );
  // }

  // With getSession

  // const [isLoading, seIsLoading] = useState(true);

  // useEffect(() => {
  //   async function newSession() {
  //     const session = await getSession();
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       seIsLoading(false);
  //     }
  //   }

  //   newSession();
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}
