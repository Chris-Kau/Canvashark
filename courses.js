async function Test(){
  try {
    const response = await fetch('https://canvashark.vercel.app/api/v1/', {
        method: 'GET',
    });

    const data = await response.json();
    console.log('User Profile courses:', data);
} catch (error) {
    console.error('Error fetching user profile:', error);
}
}