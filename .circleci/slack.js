const axios = require('axios')

axios.post(process.env.SLACK_WEBHOOK, {
  username: '🤖 UIKit CI Bot',
  icon_url: 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png',
  attachments: [
    {
      color: '#2eb886',
      title: `${process.env.CIRCLE_JOB} #${process.env.CIRCLE_BUILD_NUM}`,
      title_link: process.env.CIRCLE_BUILD_URL,
      text: `${process.argv[2]}`,
      footer: 'Cirle CI',
      footer_icon: 'https://assets.brandfolder.com/otz5mn-bw4j2w-6jzqo8/element.png'
		}
	]
})
