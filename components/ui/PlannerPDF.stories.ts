import type { Meta, StoryObj } from '@storybook/react';
// import { within, userEvent, expect, screen, fn } from '@storybook/test';

import PlannerPDF from './PlannerPDF';

const meta = {
  title: 'Molecule/PlannerPDF',
  component: PlannerPDF,
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
        startAt: new Date('2024-06-17T20:00:00.000Z'),
        endAt: new Date('2024-06-17T23:00:00.000Z'),
        userId: 'user_01HZYKPB4JWFPAADBPGHVRK5TY',
        user: { email: 'ethriel3695@gmail.com' },
        color: 'rgba(15,208,219,1)',
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
  },
} satisfies Meta<typeof PlannerPDF>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
