const axios = require('axios')

axios.post(process.env.SLACK_WEBHOOK, {
  username: '🤖 UIKit CI Bot',
  attachments: [
    {
      color: '#2eb886',
      author_name: 'Agorize UIKit',
      title: `${process.env.CIRCLE_JOB} #${process.env.CIRCLE_BUILD_NUM}`,
      title_link: process.env.CIRCLE_BUILD_URL,
      // text: `${process.env.CIRCLE_BRANCH}`,
      text: `${process.argv[2]}`,
      footer: 'Cirle CI',
      footer_icon: 'https://assets.brandfolder.com/otz5mn-bw4j2w-6jzqo8/element.png'
		}
	]
})
