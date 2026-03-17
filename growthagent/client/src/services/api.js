import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export async function login({ handle, password }) {
	const res = await api.post('/api/auth/login', { handle, password });
	return res.data;
}

export async function getPostsByHandle(handle) {
	const res = await api.get(`/api/posts/${encodeURIComponent(handle)}`);
	return res.data;
}

export async function createPost(post) {
	const res = await api.post('/api/posts', post);
	return res.data;
}

export async function getAnalyticsSummary(userId) {
	const res = await api.get(`/api/analytics/summary/${userId}`);
	return res.data;
}

export async function getPostMetrics(postId) {
	const res = await api.get(`/api/analytics/post/${postId}`);
	return res.data;
}

export async function generateAIPost(params) {
	const res = await api.post('/api/agent/generate-post', params);
	return res.data;
}
