$(document).ready(() => {
    $.ajax({
        url: '/rss',  
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const rssContainer = document.getElementById('rss-container');

            const items = data.rss.channel.item;

            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'rss-item';

                const title = document.createElement('h3');
                title.textContent = item.title;
                itemDiv.appendChild(title);

                // Verifica si hay media:content con un atributo url
                if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
                    const imageUrl = item['media:content']['$'].url;
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    itemDiv.appendChild(image);
                }

                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = 'Read more';
                itemDiv.appendChild(link);

                rssContainer.appendChild(itemDiv);
            });
        },
        error: function (error) {
            console.error('Error al cargar el feed RSS:', error);
        }
    });
});
