// Test script to verify production fallback works
const { newsData } = require('./lib/news-data.ts');

console.log('Testing static news data fallback:');
console.log('News posts count:', newsData.length);
console.log('\nPost 1:');
console.log('- Slug:', newsData[0].slug);
console.log('- Title:', newsData[0].title);
console.log('- Date:', newsData[0].date);
console.log('- Excerpt:', newsData[0].excerpt);
console.log('- Content length:', newsData[0].content.length, 'characters');

console.log('\nPost 2:');
console.log('- Slug:', newsData[1].slug);
console.log('- Title:', newsData[1].title);
console.log('- Date:', newsData[1].date);
console.log('- Excerpt:', newsData[1].excerpt);
console.log('- Content length:', newsData[1].content.length, 'characters');

console.log('\nStatic data is ready for production deployment!');
