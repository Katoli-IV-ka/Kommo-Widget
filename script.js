document.addEventListener('DOMContentLoaded', function() {
    const clientId = 'ca22635c-5b0d-4c80-9db7-f40e563bc604';
    const clientSecret = 'hLpRmyksjhkobZYh92TEZHPEQh9gm3fx3cLpOaSADNBAJYuwJLWpWS0KbiYlYoX4';
    const redirectUri = 'https://katoli-iv-ka.github.io/Kommo-Widget/'; // Замените на ваш Redirect URI
    const authorizationCode = 'def50200d98076a428e5cc5aacd1b05acf4511a258267261ca83e5e0d2d46408945ed51c63290ee400b4289de47d2e5b3dc0428bfb2af42526ad497c6284a5cb287fb8ae1032afd683247e55bbe75739e480df6f72934d4bcfa842ba960788649d0afc3c990b6508662bc5581f6edc00699c7ee7914866faf09086f110dc0e1f646154edf53a21077a33b11dbe5378ffa203b28a8baad7538dbf2d0c5fa27df6a936e778bdbef9bd7da7ed82ae0dbf7a904ce7c4755a4e751825b0e9b92c664e56909b44364d9cd639c84e3f8f49d3001e505e3a5650a5ed35458b37c0aa91ea7dced2cd7e13229e9a7ab10f352533b7c5d173c25a8343e2f512678d4b8ca58633c83a38be29ac6385a2a3f2531cf7c9dce229bca236764d428d2c2ed897d4e36d74965b56d47773f956c7280507613a58919f9404ba8fd0590a0476d2ebfa5a5bebff39ad5a67e908a4b11d857b514c9d34ea5a966f5649dd6e7d5f3d693b9d4634f61f4e6bd0fd25d3d57852ad1566f1a6268c58c4d5dc04fcf0bc7997a2df958719539ff6a0f8a1122530572208bc1976a508a2bfe5ff8f658316a770bc2d1da8def86f5744815f08039b8fb83f181b7b35cd31c9daab0b7b78349e51bf032704e2f0f2bfce49d510c6316ada372ffc5f3f6aeec13ae3e5bef4b9b4ad8f15fa2c69d9ad7ef8176fbada50a82023e062115affb4f5c187fee30623f88567';

    function getAccessToken() {
        return fetch('https://2maxkhvedinich.kommo.com/oauth2/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
                code: authorizationCode
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Access Token Response:', data);
            return data.access_token;
        })
        .catch(error => console.error('Ошибка получения токена:', error));
    }


    function fetchLeads(accessToken) {
        fetch('https://2maxkhvedinich.kommo.com/api/v4/leads', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Leads Response:', data);
            const leadsCount = data._embedded.leads.length;
            document.getElementById('leads-count').innerText = `Количество сделок: ${leadsCount}`;
        })
        .catch(error => console.error('Ошибка:', error));
    }

    getAccessToken().then(accessToken => {
        fetchLeads(accessToken);
    });
});
