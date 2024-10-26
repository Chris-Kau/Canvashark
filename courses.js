const course_url = "https://csulb.instructure.com/api/v1/courses";
async function Test(){
  try {
    const response = await fetch('http://localhost:3000/api/v1/', {
        method: 'GET',
    });

    const data = await response.json();
    console.log('User Profile courses:', data);
} catch (error) {
    console.error('Error fetching user profile:', error);
}
}