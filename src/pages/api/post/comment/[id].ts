import octokit from '~/lib/octokit';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Issue, Label } from '~/lib/octokit/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: title } = req.query;

  if (!title) {
    return res.status(400).json({
      message: 'post pathname is required.',
    });
  }

  const { data } = await octokit.request('GET /repos/mrbartrns/blog/issues', {
    owner: 'mrbartrns',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const currentIssue = data.find(
    (issue: Issue) =>
      issue.title === `posts/${title}` &&
      issue.labels.find((label: Label) => label.name === 'Comment')
  ) as Issue;

  if (!currentIssue) {
    return res.status(200).json({
      comments: 0,
    });
  }

  return res.status(200).json({
    comments: currentIssue.comments,
  });
};

export default handler;
