import Link from "next/link";
import useUser, { USER_STATES } from "/hooks/useUser";

export default function Nav() {
  const user = useUser();
  console.log(user);
  return (
    <div className="nav">
      <div className="logo">CangurApp</div>
      {user === USER_STATES.NOT_LOGGED && (
        <ul>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/singup">
              <a>SingUp</a>
            </Link>
          </li>
        </ul>
      )}
      {user && (
        <ul>
            <li>
                <img src={user.photoURL}></img>
            </li>
          <li>Hola {user.displayName}</li>
          <li>
            <Link href="/perfil">
              <a>Mi perfil</a>
            </Link>
          </li>
        </ul>
      )}
      {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
      <style jsx>{`
        .nav {
          border: 1px solid red;
          width: 100%;
          padding: 5px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        ul {
          margin: 0;
        }

        li {
          display: inline-block;
          padding: 0 10px;
        }
        img{
            height:50px;
            width:50px;
            border-radius:50%;
        }
        .logo {
            font-size:40px
        }
      `}</style>
    </div>
  );
}
