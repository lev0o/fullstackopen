const lodash = require('lodash')

const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	} 

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const reducer = (prev, curr) => {
		return (prev && prev.likes > curr.likes) 
			? prev
			: curr
	}

	return blogs.length === 0
		? null
		: blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) 
		return null

	const result = lodash(blogs)
		.groupBy('author')
		.map((blogs, author) => ({
			author,
			count: blogs.length
		}))
		.maxBy('count')

	return result
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) 
		return null

	const result = lodash(blogs)
		.groupBy('author')
		.map((blogs, author) => ({
			author,
			likes: lodash.sumBy(blogs, 'likes')
		}))
		.maxBy('likes')

	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}