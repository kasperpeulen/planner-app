import type { Meta, StoryObj } from '@storybook/react';
import {
  within,
  userEvent,
  expect,
  screen,
  fn,
  queryByAttribute,
} from '@storybook/test';

import Planner from './Planner';

const meta = {
  title: 'Page/Planner',
  component: Planner,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    currentDate: new Date('2024-06-18T18:00:00.000Z'),
    events: [
      {
        id: 'clxcmr2d700012usb6rm3d5us',
        title: 'Alex Gym',
        startAt: new Date('2024-06-12T17:00:00.000Z'),
        endAt: new Date('2024-06-12T19:00:00.000Z'),
        userId: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
        user: { email: 'ethriel3695@gmail.com' },
      },
      {
        id: 'clxcmr2d700012usb6rm3d5ps',
        title: 'Ruby Gym',
        startAt: new Date('2024-06-18T20:00:00.000Z'),
        endAt: new Date('2024-06-18T23:00:00.000Z'),
        userId: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
        user: { email: 'ethriel3695@gmail.com' },
        color: 'rgba(206,208,219,1)',
      },
      {
        id: 'clxcmr2d700012usb6rm3d5fs',
        title: 'Ruby Gym',
        startAt: new Date('2024-06-20T20:00:00.000Z'),
        endAt: new Date('2024-06-20T23:00:00.000Z'),
        userId: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
        user: { email: 'ethriel3695@gmail.com' },
        color: 'rgba(206,208,219,1)',
      },
    ],
    user: {
      sessionId: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
      accessToken: 'access_01HZYKPB4JWFPAADBPGHVRK5TY',
      user: {
        object: 'user',
        id: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
        email: 'ethriel3695@gmail.com',
        emailVerified: true,
        firstName: 'Reuben',
        profilePictureUrl:
          'https://workoscdn.com/images/v1/8STSQXZTLQob5euEiQbp1Oe1jttiuZtMiaWqYKCS2EU',
        lastName: 'Ellis',
        createdAt: '2024-06-09T13:41:04.750Z',
        updatedAt: '2024-06-09T13:41:04.750Z',
      },
    },
  },
} satisfies Meta<typeof Planner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CalendarDateChange: Story = {
  args: {
    currentDate: new Date('2024-06-08:07:00:00Z-0600'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendarButton = await canvas.findByText('Jun 8, 2024');
    await expect(calendarButton).toBeInTheDocument();
    await userEvent.click(calendarButton);

    // const dayButton = await canvas.findByRole('gridcell', { name: /day/i });
    const dayButton = await screen.findByText(17);
    await userEvent.click(dayButton);
  },
};

export const AddEvent: Story = {
  args: {
    currentDate: new Date('2024-06-08:07:00:00Z-0600'),
  },
  play: async (context) => {
    //@ts-ignore - play will always be a function
    await CalendarDateChange?.play(context);
    const { canvasElement } = context;
    const canvas = within(canvasElement);
    const eventButton = await canvas.findByText('Add Event');
    await userEvent.click(eventButton);
    await userEvent.type(await screen.findByText('Title'), 'Test Event');
    await userEvent.click(await screen.findByText('Start'));
    await userEvent.type(await screen.findByText('Start'), '2024-06-17T07:00');
    // await userEvent.click(await screen.findByText('Add Event[role="dialog"]'));
    await userEvent.click(screen.getByText('End'));
    await userEvent.type(screen.getByText('End'), '2024-06-17T08:00');
    // await userEvent.click(screen.getByText('Add Event[role="dialog"]'));
    // await userEvent.click(document.querySelector('body'));
    await userEvent.click(await screen.findByRole('combobox'));
    await userEvent.click(await screen.findByText('Weekly'));
    // await userEvent.click(
    //   await queryByAttribute('id', screen, 'reference267132')
    // );
    // await userEvent.click(document.querySelector('div.css-x1r72b-Slider'));
    // await userEvent.click(screen.getByText('Save'));

    // const dayButton = await canvas.findByRole('gridcell', { name: /day/i });
    // const dayButton = await screen.findByText(15);
    // await userEvent.click(dayButton);
  },
};
