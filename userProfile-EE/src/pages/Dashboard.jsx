import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getSingleUser,
  getUsers,
  updateLike,
} from "../redux/userSlice";
import { getAvtars } from "../redux/avtarSlice";
//import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHeart,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faGlobe,
  faHeartCircleCheck,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Forms from "./Forms";
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, singleUser, status } = useSelector(({ users }) => users);
  const { avtar } = useSelector(({ avatars }) => avatars);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(singleUser);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAvtars());
  }, [dispatch]);

  if (status) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status" className="mr-2"></Spinner>

        <div className="ml-2">{status}</div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row">
        {user?.map(({ name, email, phone, website, liked, id }) => {
          const userAvatar = avtar.find((el) => el.id === id);
          return (
            <div className="col-10 col-md-3 mt-5 " key={id}>
              <div className="card  bg-light">
                <div className="d-flex flex-column align-items-center">
                  {userAvatar && (
                    <div className="image m-2 text-black" key={userAvatar.id}>
                      <img
                        src={userAvatar.avatar}
                        width={200}
                        height={150}
                        alt="img"
                      />
                    </div>
                  )}
                  <div className="m-2 p-2 w-100 bg-white ">
                    <p className="mb-0 mt-1 m-2 fs-6 textLeft">{name}</p>
                    {/* <span className="text-left">{type }</span> */}
                    <div className="p-2 mt-0  d-flex flex-column justify-content-between rounded  ">
                      <div className="d-flex flex-column">
                        <span className="articles fs-7 text-black">
                          {" "}
                          <FontAwesomeIcon icon={faEnvelope} /> {email}
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="followers fs-7">
                          {" "}
                          <FontAwesomeIcon icon={faPhone} /> {phone}
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="rating  fs-7">
                          <FontAwesomeIcon icon={faGlobe} /> {website}{" "}
                        </span>
                      </div>
                    </div>
                    <div className=" p-2 d-flex flex-row justify-content-between bg-light">
                      {" "}
                      <FontAwesomeIcon
                        icon={liked ? faHeartCircleCheck : faHeart}
                        onClick={() => dispatch(updateLike(id))}
                      />
                      <FontAwesomeIcon
                        onClick={() => {
                          handleShow();
                          dispatch(getSingleUser(id));
                        }}
                        icon={faPenToSquare}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => dispatch(deleteUser(id))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Forms show={show} handleClose={handleClose} />
    </div>
  );
};

export default Dashboard;
