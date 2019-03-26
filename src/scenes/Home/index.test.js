import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';

const newComments = [{
  postId: 1,
  id: 1,
  name: 'id labore ex et quam laborum',
  email: 'Eliseo@gardner.biz',
  body:
    'laudantium enim quasi est quidem magnam voluptate …utem quasi↵reiciendis et nam sapiente accusantium',
},
{
  postId: 1,
  id: 2,
  name: 'quo vero reiciendis velit similique earum',
  email: 'Jayne_Kuhic@sydney.com',
  body:
    'est natus enim nihil est dolore omnis voluptatem n…iatur↵nihil sint nostrum voluptatem reiciendis et',
},
{
  postId: 1,
  id: 3,
  name: 'odio adipisci rerum aut animi',
  email: 'Nikita@garfield.biz',
  body:
    'quia molestiae reprehenderit quasi aspernatur↵aut …mus et vero voluptates excepturi deleniti ratione',
},
{
  postId: 1,
  id: 4,
  name: 'alias odio sit',
  email: 'Lew@alysha.tv',
  body:
    'non et atque↵occaecati deserunt quas accusantium u…r itaque dolor↵et qui rerum deleniti ut occaecati',
}];

describe('Home component tests', () => {
  const baseProps = {
    getCommentsFunction: jest.fn(),
    comments: [],
    commentsLoading: false,
  };
  it('Should render UI components', () => {
    const wrapper = shallow(<Home {...baseProps} />);
    expect(baseProps.getCommentsFunction).toBeCalled();
    expect(wrapper.find('CommentsList')).toHaveLength(1);
  });

  it('Should load comments', () => {
    const wrapper = shallow(<Home {...baseProps} />);
    const instance = wrapper.instance();
    wrapper.setProps({ comments: newComments });
    expect(instance.state.comments).toEqual(newComments);
  });

  it('Should show Loading text', () => {
    const wrapper = shallow(<Home {...baseProps} />);
    wrapper.setProps({ commentsLoading: true });
    expect(wrapper.props().children).toContain('Loading...');
  });
});
