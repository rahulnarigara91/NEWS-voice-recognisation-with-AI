import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import WordsToNumbers, { wordsToNumbers } from 'words-to-numbers';

const alanKey =
	'ea3d3e50accf8a42b660ce7c8f8257fa2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(-1);
	const classes = useStyles();
	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === 'highlight') {
					setActiveArticle(preActiveArticle => preActiveArticle + 1);
				} else if (command == 'open') {
					const parsedNumber =
						number.length > 2
							? wordsToNumbers(number, { fuzzy: true })
							: number;
					const article = articles[parsedNumber - 1];

					if (parsedNumber > 20) {
						alanBtn().playText('please try that again');
					} else if (article) {
						window.open(article.url, '_blank');
						alanBtn().playText('Opening..');
					}
				}
			},
		});
	}, []);
	return (
		<>
			<div>
				<div className={classes.logoContainer}>
					<img
						src='https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'
						className={classes.alanLogo}
						alt='Title_Img'
					/>
				</div>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</>
	);
};

export default App;
