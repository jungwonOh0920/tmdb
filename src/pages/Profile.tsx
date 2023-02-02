import { useContext, useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import SignIn from "../components/SignIn/SignIn"
import Avatars from "../components/Avatar/Avatars"
import { Context } from '../components/Layout/Layout'
import Button from "../components/Button/Button"
import DragNDrop from "../components/DragNDrop/DragNDrop"
import "../styles/profile.scss"


function Profile() {
  // User context
  const contextUser: any = useContext(Context)

  const [AvatarIdx, setAvatarIdx] = useState(-1)

  const auth = getAuth()
  const navigate = useNavigate()

  const logout = () => {
    try {
      auth.signOut()
    } catch (error) {
      console.log(error)
    }

    navigate("/")
  }

  const updateAvatarIdx = (idx: number) => {
    setAvatarIdx(idx)
  }

  return (
    <div className="profile">
      {contextUser ? <Avatars userName={contextUser.displayName} sendAvatarIdx={updateAvatarIdx} /> : <SignIn />}
      <br />
      <DragNDrop />
      {contextUser && (
        <Button
          onClick={logout}
          children={"Log out"}
        />
      )}
      <div className={`blurry-gradient ${AvatarIdx > -1 ? `avatar-${AvatarIdx}` : ''}`}></div>

    </div>
  );
}

export default Profile;
