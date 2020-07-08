import axios from "axios";

const joinForm = document.getElementById("jsJoinForm");

const handleEmailCheck = async () => {
  const email = document.getElementById("email").value;
  const idCheck = document.getElementById("id_check");
  console.log(idCheck);

  const response = await axios({
    url: `api/users/${email}`,
    method: "GET",
  });
  if (response.status === 200) {
    console.log(response.data);
    if (response.data) {
      idCheck.innerHTML = "중복된 이메일입니다.";
      idCheck.classList.add("text-red-700");
      idCheck.classList.remove("text-black");
    } else {
      idCheck.innerHTML = "사용 가능한 이메일입니다.";
      idCheck.classList.add("text-black");
      idCheck.classList.remove("text-red-700");
    }
  }
};

if (joinForm) {
  const emailCheckBtn = document.getElementById("jsEmailCheck");
  emailCheckBtn.addEventListener("click", handleEmailCheck);
}
