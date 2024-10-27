async function callOpenAI(prompt) {
    const response = await fetch('/api/ChatAI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('OpenAI response:', data.reply);
    } else {
        console.error('Error calling OpenAI API:', response.statusText);
    }
}

