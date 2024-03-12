import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import avatar from "../../public/images/team/avater-g.png";

import UserMenuItems from "./HeaderProps/UserMenuItems";

const UserMenu = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="inner">
        <div className="rbt-admin-profile">
          <div className="admin-thumbnail">
            <Image
              src={session?.user?.image || avatar}
              alt="User Images"
              width={20}
              height={20}
            />
          </div>
          <div className="admin-info">
            <span className="name">{session?.user.name || "User"}</span>
            <Link
              className="rbt-btn-link color-primary"
              href="/profile-details"
            >
              View Profile
            </Link>
          </div>
        </div>
        <UserMenuItems parentClass="user-list-wrapper user-nav" />
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper user-nav">
          <li>
            <Link href="#">
              <i className="feather-help-circle"></i>
              <span>Help Center</span>
            </Link>
          </li>
          <li>
            <Link href="/profile-details">
              <i className="feather-settings"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper">
          <li>
            <Link onClick={() => signOut()} href="/AuthPage">
              <i className="feather-log-out"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
