document.addEventListener('DOMContentLoaded', function() {
    const clientId = 'b6b56a4a-7e7b-484f-8b3f-42f63f43f96b';
    const clientSecret = 'jdbo6dsDQXNBEHHr06uyySyliDu6O1QIMdVUrf8rkYrmKM1EK1EWiSpSLaTEcvFi';
    const redirectUri = 'https://katoli-iv-ka.github.io/Kommo-Widget/'; // Замените на ваш Redirect URI
    const authorizationCode = 'def5020039ece29f93d49f214d62641ab9f62f7e5f9a65f16bd62c7b88ec04cd03bf246674cb66c0c86442d76cd149255a3103c9041ad4ce0345fe3369ab624a456267d551275d4e29b91b28a0888287c0d65bc46e8dd6e9896ff0fa371a9cc3e928576e5d7432ab89254f0bba32552087d3c5f7e04604c61c144c5cbaa23e9b591933735bb49966b6f957a345b04a93db3ad631d9dbd815168bbb3030fc791f91d374288d92197f091b07a05a38cb83f971dbcd49e5fa319fccbb5b5a1c65faea59b89fe71f4e6683d8d0110850820072c72bf4d2d3304966f3016f1b00472fc32f53b4a52b1f24193cbc1a1530c76978808a3962ab9d50973081e92bea28ecc02bd6f3699e18b4a596d1e7a81f0d29d20a5585946c891fbde34db83e03dbea5aae3c6687026f183308021f988ff2f6c2e9314b078b3e5d606c3089de4967e305ecd33cad2a15c8dad5450c5cff5ef41d4fda26cf2978c1a251a282a22182e9136f046c9016ce83a05f47827dd3fc8d2ed18ac18b9883b738124d276b48b5e1351dfd898193557af9a40db3f987a34f26b268a9ae65ad020b39688c71dbfddf5c6378a5b84cca5c87decb4a4c20fa2a3e7627270a2ef3950925c173ede32beab9798f9d1d44160dd059bce2fea81b7e8a25b9da1b88ab9986b36e3becc111a9d48228e2874ac3c77d66bbec7ee49d69eb8fa414b21de9ea8a73a567720ccb';

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
