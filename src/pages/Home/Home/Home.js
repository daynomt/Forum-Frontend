import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./home.css";
import exampleImage from "../../../images/profile.jpeg";
function Home({ logout }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);

  // useEffect(() => {
  //   if (!userData.user) navigate("/login");
  // }, [userData.user, navigate]);

  const handleClick = () => {
    navigate("/asking");
  };

  const Questions = async () => {
    try {
      const questionRes = await axios.get(
        "http://localhost:4000/api/questions/ask",
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setAllQuestions(questionRes.data.data);
    } catch (err) {
      console.log("problems", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };
  console.log(allQuestions);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    } else {
      // ///but if they are logged in excute the question function(whic means only logged in people can see the questions)
      Questions();
    }
  }, [userData.user, navigate]);

  return (
    <div className="container">
      <div className="headers">
        <button type="" onClick={handleClick} className="askBotton">
          Ask question
        </button>
        <h3 className="welcomeSection ">
          Welcome:{userData.user?.display_name}
        </h3>
      </div>
      <div className="questionSection">
        <h2>Questions</h2>
        <hr style={{ borderColor: "black" }} />
        {allQuestions.map((question) => (
          <Link to={`/answer/${question.post_id}`} className="toanswerLink">
            <div key={question.post_id}>
              <div className="displayerDiv">
                <div className="nameAndDesc">
                  <div>
                    <img src={exampleImage} />
                    {/* <AccountCircleIcon /> */}
                    <p> {question.user_name}</p>
                  </div>
                  <div>
                    <p className="questionTitle">{question.question}</p>
                  </div>
                </div>

                <div>
                  <ArrowForwardIosIcon />
                </div>
              </div>

              <hr style={{ borderColor: "black" }} />
            </div>
          </Link>
        ))}
      </div>
      {/* <AnswerPage allQuestions={allQuestions} /> */}
    </div>
  );
}

export default Home;

// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../context/UserContext";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./home.css";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import axios from "axios";
// import AnswerPage from "./AnswerPage/Answer";

// function Home({ logout }) {
//   const navigate = useNavigate();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [userData, setUserData] = useContext(UserContext);

//   const handleClick = () => {
//     navigate("/toAskPage");
//   };

//   const Questions = async () => {
//     try {
//       const questionRes = await axios.get(
//         "http://localhost:3000/api/questions/ask",
//         {
//           headers: { "x-auth-token": userData.token },
//         }
//       );
//       setAllQuestions(questionRes.data.data);
//     } catch (err) {
//       console.log("problems", err.response.data.msg);
//       alert(err.response.data.msg);
//     }
//   };
//   console.log(allQuestions);

//   useEffect(() => {
//     if (!userData.user) {
//       navigate("/login");
//     } else {
//       Questions();
//     }
//   }, [userData.user, navigate]);

//   return (
//     <div className="container">
//       <div className="headers">
//         <button type="" onClick={handleClick} className="askBotton">
//           Ask question
//         </button>
//         <h3 className="welcomeSection ">
//           Welcome:{userData.user?.display_name}
//         </h3>
//       </div>
//       <div className="questionSection">
//         <h2>Questions</h2>
//         <hr style={{ borderColor: "black" }} />
//         {allQuestions.map((question) => (
//           <Link to={`/answer/${question.post_id}`} className="toanswerLink">
//             <div key={question.post_id}>
//               <div className="displayerDiv">
//                 <div className="nameAndDesc">
//                   <div>
//                     <AccountCircleIcon />
//                     <p> {question.user_name}</p>
//                   </div>
//                   <div>
//                     <p className="questionTitle">{question.question}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <ArrowForwardIosIcon />
//                 </div>
//               </div>

//               <hr style={{ borderColor: "black" }} />
//             </div>
//           </Link>
//         ))}
//       </div>
//       {/* <AnswerPage allQuestions={allQuestions} /> */}
//     </div>
//   );
// }

// export default Home;
