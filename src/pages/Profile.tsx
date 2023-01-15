import { useEffect, useState } from "react";
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn/SignIn";
import Avatars from "../components/Avatar/Avatars";
import "../styles/profile.scss";
import Button from "../components/Button/Button";

function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [AvatarIdx, setAvatarIdx] = useState(-1);

  const auth = getAuth();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [isAuthenticated]);

  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();

    navigate("/");
  };

  const updateAvatarIdx = (idx: number) => {
    setAvatarIdx(idx)
  }

  return (
    <div className="profile">
      {isAuthenticated ? <Avatars userName={user?.displayName} sendAvatarIdx={updateAvatarIdx} /> : <SignIn />}
      <br />
      {isAuthenticated && (
        <Button
          onClick={logout}
          className={"logout-btn"}
          children={"Log out"}
        />
      )}
      <div className={`blurry-gradient ${AvatarIdx > -1 ? `avatar-${AvatarIdx}` : ''}`}></div>
    </div>
  );
}

export default Profile;
