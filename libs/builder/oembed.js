const oEmbedProviders = [
 {
    regex: /^(https:\/\/(.*).youtube.com\/watch(.*)|https:\/\/(.*).youtube.com\/v\/(.*)|https:\/\/youtu.be\/(.*)|https:\/\/(.*).youtube.com\/playlist?list=(.*))/,
    url: "https://www.youtube.com/oembed"
 },
 {
    regex: /https?:\/\/((m|www)\.)?youtube\.com\/watch.*/,
    url: "https://www.youtube.com/oembed"
  },
  {
    regex: /https?:\/\/((m|www)\.)?youtube\.com\/playlist.*/,
    url: "https://www.youtube.com/oembed"
  },
  {
    regex: /https?:\/\/((m|www)\.)?youtube\.com\/shorts\/*/,
    url: "https://www.youtube.com/oembed"
  },
  {
    regex: /https?:\/\/((m|www)\.)?youtube\.com\/live\/*/,
    url: "https://www.youtube.com/oembed"
  },
  {
    regex: /https?:\/\/youtu\.be\/.*/,
    url: "https://www.youtube.com/oembed"
  },
  {
    regex: /^(https:\/\/vimeo.com\/(.*)|https:\/\/vimeo.com\/album\/(.*)\/video\/(.*)|https:\/\/vimeo.com\/channels\/(.*)\/(.*)|https:\/\/vimeo.com\/groups\/(.*)\/videos\/(.*)|https:\/\/vimeo.com\/ondemand\/(.*)\/(.*)|https:\/\/player.vimeo.com\/video\/(.*))/,
    url: "https://vimeo.com/api/oembed.json"
  },
  {
    regex: /https?:\/\/(.+\.)?vimeo\.com\/.*/,
    url: "https://vimeo.com/api/oembed.json"
  },
  {
    regex: /https?:\/\/(www\.)?dailymotion\.com\/.*/,
    url: "https://www.dailymotion.com/services/oembed"
  },
  {
    regex: /https?:\/\/dai\.ly\/.*/,
    url: "https://www.dailymotion.com/services/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?flickr\.com\/.*/,
    url: "https://www.flickr.com/services/oembed/"
  },
  {
    regex: /https?:\/\/flic\.kr\/.*/,
    url: "https://www.flickr.com/services/oembed/"
  },
  {
    regex: /https?:\/\/(.+\.)?smugmug\.com\/.*/,
    url: "https://api.smugmug.com/services/oembed/"
  },
  {
    regex: /https?:\/\/(www\.)?scribd\.com\/(doc|document)\/.*/,
    url: "https://www.scribd.com/services/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/\w{1,15}\/status(es)?\/.*/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/\w{1,15}$/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/\w{1,15}\/likes$/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/\w{1,15}\/lists\/.*/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/\w{1,15}\/timelines\/.*/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?x\.com\/i\/moments\/.*/,
    url: "https://publish.twitter.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?soundcloud\.com\/.*/,
    url: "https://soundcloud.com/oembed"
  },
  {
    regex: /https?:\/\/(.+?\.)?slideshare\.net\/.*/,
    url: "https://www.slideshare.net/api/oembed/2"
  },
  {
    regex: /https?:\/\/(open|play)\.spotify\.com\/.*/,
    url: "https://embed.spotify.com/oembed/"
  },
  {
    regex: /https?:\/\/(.+\.)?imgur\.com\/.*/,
    url: "https://api.imgur.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?issuu\.com\/.+\/docs\/.+/,
    url: "https://issuu.com/oembed_wp"
  },
  {
    regex: /https?:\/\/(www\.)?mixcloud\.com\/.*/,
    url: "https://app.mixcloud.com/oembed/"
  },
  {
    regex: /https?:\/\/(www\.|embed\.)?ted\.com\/talks\/.*/,
    url: "https://www.ted.com/services/v1/oembed.json"
  },
  {
    regex: /https?:\/\/(www\.)?(animoto|video214)\.com\/play\/.*/,
    url: "https://animoto.com/oembeds/create"
  },
  {
    regex: /https?:\/\/(.+)\.tumblr\.com\/.*/,
    url: "https://www.tumblr.com/oembed/1.0"
  },
  {
    regex: /https?:\/\/(www\.)?kickstarter\.com\/projects\/.*/,
    url: "https://www.kickstarter.com/services/oembed"
  },
  {
    regex: /https?:\/\/kck\.st\/.*/,
    url: "https://www.kickstarter.com/services/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?reverbnation\.com\/.*/,
    url: "https://www.reverbnation.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?reddit\.com\/r\/[^\/]+\/comments\/.*/,
    url: "https://www.reddit.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?speakerdeck\.com\/.*/,
    url: "https://speakerdeck.com/oembed.json"
  },
  {
    regex: /https?:\/\/(www\.)?screencast\.com\/.*/,
    url: "https://api.screencast.com/external/oembed"
  },
  {
    regex: /https?:\/\/([a-z0-9-]+\.)?amazon\.(com|com\.mx|com\.br|ca)\/.*/,
    url: "https://read.amazon.com/kp/api/oembed"
  },
  {
    regex: /https?:\/\/([a-z0-9-]+\.)?amazon\.(co\.uk|de|fr|it|es|in|nl|ru)\/.*/,
    url: "https://read.amazon.co.uk/kp/api/oembed"
  },
  {
    regex: /https?:\/\/([a-z0-9-]+\.)?amazon\.(co\.jp|com\.au)\/.*/,
    url: "https://read.amazon.com.au/kp/api/oembed"
  },
  {
    regex: /https?:\/\/([a-z0-9-]+\.)?amazon\.cn\/.*/,
    url: "https://read.amazon.cn/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?a\.co\/.*/,
    url: "https://read.amazon.com/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?amzn\.to\/.*/,
    url: "https://read.amazon.com/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?amzn\.eu\/.*/,
    url: "https://read.amazon.co.uk/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?amzn\.in\/.*/,
    url: "https://read.amazon.in/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?amzn\.asia\/.*/,
    url: "https://read.amazon.com.au/kp/api/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?z\.cn\/.*/,
    url: "https://read.amazon.cn/kp/api/oembed"
  },
  {
    regex: /https?:\/\/www\.someecards\.com\/.+-cards\/.+/,
    url: "https://www.someecards.com/v2/oembed/"
  },
  {
    regex: /https?:\/\/www\.someecards\.com\/usercards\/viewcard\/.+/,
    url: "https://www.someecards.com/v2/oembed/"
  },
  {
    regex: /https?:\/\/some\.ly\/.+/,
    url: "https://www.someecards.com/v2/oembed/"
  },
  {
    regex: /https?:\/\/(www\.)?tiktok\.com\/.*\/video\/.*/,
    url: "https://www.tiktok.com/oembed"
  },
  {
    regex: /https?:\/\/(www\.)?tiktok\.com\/\/.*/,
    url: "https://www.tiktok.com/oembed"
  },
  {
    regex: /https?:\/\/([a-z]{2}|www)\.pinterest\.com(\.(au|mx))?\/.*/,
    url: "https://www.pinterest.com/oembed.json"
  },
  {
    regex: /https?:\/\/(www\.)?wolframcloud\.com\/obj\/.+/,
    url: "https://www.wolframcloud.com/oembed"
  },
  {
    regex: /https?:\/\/((play|www)\.)?anghami\.com\/.*/,
    url: "https://api.anghami.com/rest/v1/oembed.view"
  }   
];

const urlTransforms = [
  {
	regex: /youtu\.be\/([\w\-_\?&=.]+)/i,
	url: 'www.youtube.com/embed/$1',
  },
  {
	regex: /youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,
	url: 'www.youtube.com/embed/$2?$4',
  },
  {
	regex: /youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,
	url: 'www.youtube.com/embed/$1',
  },
  {
	regex: /vimeo\.com\/([0-9]+)\?h=(\w+)/,
	url: 'player.vimeo.com/video/$1?h=$2&title=0&byline=0&portrait=0&color=8dc7dc',
  },
  {
	regex: /vimeo\.com\/(.*)\/([0-9]+)\?h=(\w+)/,
	url: 'player.vimeo.com/video/$2?h=$3&title=0&amp;byline=0',
  },
  {
	regex: /vimeo\.com\/([0-9]+)/,
	url: 'player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc',
  },
  {
	regex: /vimeo\.com\/(.*)\/([0-9]+)/,
	url: 'player.vimeo.com/video/$2?title=0&amp;byline=0',
  },
  {
	regex: /(maps|www)\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,
	url: '$2.google.com/maps/ms?msid=$3&output=embed"',
  },  
  {
	regex: /(maps|www)\.google\.([a-z]{2,3})\/maps\/@(.+)/,
	url: '$1.google.com/maps/embed?center=$3"',
  },  
  {
	regex: /dailymotion\.com\/video\/([^_]+)/,
	url: 'www.dailymotion.com/embed/video/$1',
  },
  {
	regex: /dai\.ly\/([^_]+)/,
	url: 'www.dailymotion.com/embed/video/$1',
  }
];

async function getOembed(url, maxwidth = 800, maxheight = 600, silent = false) {
	let oembedUrl;

	for (const service of oEmbedProviders) {
		if (service.regex.exec(url)) {
		   let eurl = encodeURIComponent(url);
		   oembedUrl = service.url + `?url=${eurl}&maxwidth=${maxwidth}&maxheight=${maxheight}&format=json`;
		}
	 }

	 if (oembedUrl === undefined) {
		 
		const matchTransform = (url, maxwidth, maxheight) => {
			for (const transforms of urlTransforms) {
				let matches = transforms.regex.exec(url);
				if (matches) {
					let newUrl = transforms.url;
					for (let i = 0; i < matches.length; i++) {
						newUrl = newUrl.replace('$' + i, () => matches[i] ? matches[i] : '');
					}
					return `<iframe src="https://${newUrl}" width="${maxwidth}" height="${maxheight}" style="border:0;" loading="lazy" ></iframe>`;
				}
			}
		};
		 
		 let transform = matchTransform(url, maxwidth, maxheight);
		 if (transform) {
			 return {html: transform};
		 }
		 
		 if (!silent) {
			 let message = 'Embed error: URL did not match any provider.';
			 displayToast("bg-danger", "Error", message);
		 }
		 
		 return;
	 }

	 let remoteResponse;
	 //try to fetch directly, if CORS error use proxy
	 for (url of [oembedUrl,oEmbedProxyUrl + "&url=" + encodeURIComponent(oembedUrl)]) { 

		 try {
			 remoteResponse = await window.fetch(url);

			 if (remoteResponse && remoteResponse.status == 200) {
				 break;
			}
		} catch (error) {
			console.log(error);
		}
	 }

	 if (!remoteResponse || remoteResponse.status !== 200) {
		let message = `Embed error: Could not fetch embed URL.`;
		displayToast("bg-danger", "Error", message);
	 }

	 const json = await remoteResponse.json();

	 if (json.html === undefined) {
		const message = `Eembed error: ${message}`;
		displayToast("bg-danger", "Error", message);
		return;
	 }

    //response = { url: url, html: json.html, poster: json.thumbnail_url };
	response = json;

	return response;
}
