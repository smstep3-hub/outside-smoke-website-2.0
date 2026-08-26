(async function(){
  try{
    const resp = await fetch('http://127.0.0.1:3000/api/contact',{ 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        swimTeamName: 'Test Team',
        state: 'California',
        timeZone: 'Pacific',
        message: 'Hello from test'
      })
    });
    const text = await resp.text();
    console.log('Status:', resp.status);
    console.log('Body:', text);
  } catch(e){
    console.error('Request error:', e);
  }
})();
