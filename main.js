'use strict';

const themeBtn = document.getElementById('theme');
const currentTheme = document.getElementById('theme-name');
const themeIcon = document.getElementById('theme-icon');
const userSearch = document.getElementById('search-input');
const searchUsrBtn = document.getElementById('search-user');
const userIcon = document.getElementById('user-icon');
const userName = document.getElementById('user-name');
const userLink = document.getElementById('user-link');
const joinDate = document.getElementById('user-date');
const userBio = document.getElementById('bio');
const repo = document.getElementById('repo');
const follower = document.getElementById('follower');
const following = document.getElementById('following');
const locate = document.getElementById('location');
const blog = document.getElementById('blog');
const twitter = document.getElementById('twitter_username');
const work = document.getElementById('company');
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let darkMode = false;


themeBtn.addEventListener('click', changeTheme);

searchUsrBtn.addEventListener('click', getUserData);

function changeTheme() {
		if (!darkMode) {
				darkMode = true;
				document.getElementById('theme-dark').href = 'css/darktheme.css';
				
				currentTheme.textContent = 'LIGHT';
				themeIcon.src = 'assets/icon-sun.svg';
		}
		else {
				darkMode = false;
				document.getElementById('theme-dark').href = '';
				
				currentTheme.textContent = 'LIGHT';
				themeIcon.src = 'assets/icon-moon.svg';
		}
}

function getUserData() {
		let userName = userSearch.value;
		fetchUserData(userName);
}

function fetchUserData(userName) {
  let obj;

fetch(`https://api.github.com/users/${userName}`).then((res) => res.json()).then(data => {
				updateProfile(data);
		});
}

function updateProfile(data) {
		let join = data.created_at.split('-');
		console.log(join)
		if (data.message === undefined) {
				userIcon.src = data.avatar_url;
				userName.textContent = data.name ?? data.login;
				userLink.textContent = `@${data.login}`;
				joinDate.textContent = `Joined ${join[2].slice(0, 2)} ${months[Number(join[1])+1]} ${join[0]}`;
				
				userBio.textContent = data.bio ?? 'This profile has no bio.';
				
				repo.textContent = data.public_repos;
				follower.textContent = data.followers;
				following.textContent = data.following;
				
				updateDetail(locate, data);
				updateDetail(blog, data);
				updateDetail(twitter, data);
				updateDetail(work, data);
		}
}

function updateDetail(el, data) {
	
		if (data[el.id] === null || data[el.id] === '') {
				document.querySelector(`.${el.id}`).classList.add('not-found');
				el.textContent = 'Not Available';
		}
		else {
				document.querySelector(`.${el.id}`).classList.remove('not-found');
				el.textContent = data[el.id];
		}
}
