const course_url = "https://csulb.instructure.com/api/v1/courses";
async function Test(){
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/self/profile/', {
        method: 'GET',
    });

    const data = await response.json();
    console.log('User Profile:', data);
} catch (error) {
    console.error('Error fetching user profile:', error);
}
}