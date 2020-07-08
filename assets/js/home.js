const toiletName = document.getElementById("js-toiletName");
const toiletTime = document.getElementById("js-toiletTime");
const findWayBtn = document.getElementById("js-findWay");

export const addToiletDetail = (toilet) => {
  toiletName.innerHTML = toilet.name;
  toiletTime.innerHTML = toilet.openTime;
  findWayBtn.classList.remove("invisible");
};
