export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const rssError = doc.querySelector('parsererror');
  if (rssError) {
    throw new Error('invalid');
  }

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const feed = {
    title: feedTitle,
    description: feedDescription,
  };

  const posts = [];
  const postItems = doc.querySelectorAll('item');
  postItems.forEach((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postDescription = post.querySelector('description').textContent;
    const postLink = post.querySelector('link').textContent;
    posts.push({ title: postTitle, description: postDescription, link: postLink });
  });

  return { feed, posts };
};
