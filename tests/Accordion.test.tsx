import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '@/components/ui/Accordion';

const items = [
  { id: 'a', question: 'What is BugCap Labs?', answer: 'A technology company in Erode.' },
  { id: 'b', question: 'Do you offer internships?', answer: 'Yes, across five tracks.' },
];

describe('Accordion', () => {
  it('renders every question as a button', () => {
    render(<Accordion items={items} />);

    expect(screen.getByRole('button', { name: 'What is BugCap Labs?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Do you offer internships?' })).toBeInTheDocument();
  });

  it('starts with all panels collapsed', () => {
    render(<Accordion items={items} />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands a panel on click and reveals the answer', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByText('A technology company in Erode.')).toBeInTheDocument();
  });

  it('collapses an open panel when clicked again', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    await user.click(trigger);
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps only one panel open by default', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const first = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    const second = screen.getByRole('button', { name: 'Do you offer internships?' });

    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('allows multiple open panels when configured', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} allowMultiple />);

    const first = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    const second = screen.getByRole('button', { name: 'Do you offer internships?' });

    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('wires each trigger to its panel via aria-controls', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    await user.click(trigger);

    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();

    const panel = document.getElementById(panelId as string);
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('is operable with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    await user.tab();
    const trigger = screen.getByRole('button', { name: 'What is BugCap Labs?' });
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
