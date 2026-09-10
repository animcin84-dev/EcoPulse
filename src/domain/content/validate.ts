import type { Lesson, LocalizedText, RelationType } from './types.ts';

const relationTypes: RelationType[] = [
  'causes',
  'contributes_to',
  'affects',
  'part_of',
  'related_to',
  'depends_on',
  'example_of',
  'absorbed_by',
];

function validateLocalizedText(value: LocalizedText | undefined, path: string, errors: string[]) {
  if (!value?.en?.trim()) errors.push(`${path}.en is required`);
  if (!value?.kk?.trim()) errors.push(`${path}.kk is required`);
}

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];

  if (!lesson.id.trim()) errors.push('lesson.id is required');
  if (!lesson.slug.trim()) errors.push('lesson.slug is required');
  if (!lesson.version.trim()) errors.push('lesson.version is required');
  if (!lesson.world.trim()) errors.push('lesson.world is required');
  if (!Number.isFinite(lesson.estimatedMinutes) || lesson.estimatedMinutes <= 0) {
    errors.push('lesson.estimatedMinutes must be greater than 0');
  }
  validateLocalizedText(lesson.title, 'lesson.title', errors);

  if (new Set(lesson.targetWords).size !== lesson.targetWords.length) {
    errors.push('lesson.targetWords must be unique');
  }

  if (!Array.isArray(lesson.sourceIds) || lesson.sourceIds.length === 0) {
    errors.push('lesson.sourceIds must not be empty');
  } else {
    if (new Set(lesson.sourceIds).size !== lesson.sourceIds.length) errors.push('lesson.sourceIds must be unique');
    if (lesson.sourceIds.some((sourceId) => !sourceId.trim())) errors.push('lesson.sourceIds must not contain blank ids');
  }

  const stepIds = lesson.steps.map((step) => step.id);
  if (new Set(stepIds).size !== stepIds.length) errors.push('lesson.steps ids must be unique');

  lesson.steps.forEach((step, stepIndex) => {
    const path = `lesson.steps[${stepIndex}]`;
    if (!step.id.trim()) errors.push(`${path}.id is required`);
    validateLocalizedText(step.title, `${path}.title`, errors);
    if ('body' in step && step.body) validateLocalizedText(step.body, `${path}.body`, errors);
    if ('prompt' in step) validateLocalizedText(step.prompt, `${path}.prompt`, errors);
    if ('statement' in step) validateLocalizedText(step.statement, `${path}.statement`, errors);
    if ('extensionPrompt' in step && step.extensionPrompt) validateLocalizedText(step.extensionPrompt, `${path}.extensionPrompt`, errors);
    if ('explanation' in step) validateLocalizedText(step.explanation, `${path}.explanation`, errors);
    if ('hint' in step && step.hint) validateLocalizedText(step.hint, `${path}.hint`, errors);

    if ('xp' in step && (!Number.isFinite(step.xp) || step.xp < 0)) {
      errors.push(`${path}.xp must be 0 or greater`);
    }

    if ('masterySignals' in step && step.masterySignals) {
      const seenSignals = new Set<string>();
      step.masterySignals.forEach((signalRef, signalIndex) => {
        const signalPath = `${path}.masterySignals[${signalIndex}]`;
        if (!lesson.targetWords.includes(signalRef.word)) errors.push(`${signalPath}.mastery signal word must be in lesson.targetWords`);
        if (signalRef.signal !== 'recognition' && signalRef.signal !== 'recall' && signalRef.signal !== 'context') {
          errors.push(`${signalPath}.signal is invalid`);
        }
        const key = `${signalRef.word}:${signalRef.signal}`;
        if (seenSignals.has(key)) errors.push(`${path}.masterySignals must not contain duplicates`);
        seenSignals.add(key);
      });
    }

    if (step.type === 'fact_myth' && step.correctAnswer !== 'fact' && step.correctAnswer !== 'myth') {
      errors.push(`${path}.correctAnswer must be fact or myth`);
    }

    if ('acceptedAnswers' in step) {
      if (step.acceptedAnswers.length === 0) errors.push(`${path}.acceptedAnswers must not be empty`);
      const normalizedAnswers = step.acceptedAnswers.map((answer) => answer.trim().toLocaleLowerCase('en').replace(/\s+/g, ' '));
      if (normalizedAnswers.some((answer) => !answer)) errors.push(`${path}.acceptedAnswers must not contain blank answers`);
      if (new Set(normalizedAnswers).size !== normalizedAnswers.length) errors.push(`${path}.acceptedAnswers must be unique after normalization`);
    }

    if (step.type === 'reading') {
      for (const level of ['A2', 'B1', 'B2'] as const) {
        if (!step.passages[level]?.trim()) errors.push(`${path}.passages.${level} is required`);
      }
      if (!step.question.trim()) errors.push(`${path}.question is required`);
      if (step.answers.length < 2) errors.push(`${path}.answers must contain at least two answers`);
      const answerIds = step.answers.map((answer) => answer.id);
      step.answers.forEach((answer, answerIndex) => {
        if (!answer.id.trim()) errors.push(`${path}.answers[${answerIndex}].id is required`);
        if (!answer.text.trim()) errors.push(`${path}.answers[${answerIndex}].text is required`);
      });
      if (new Set(answerIds).size !== answerIds.length) errors.push(`${path}.answers ids must be unique`);
      if (!answerIds.includes(step.correctAnswerId)) errors.push(`${path}.correctAnswerId must reference an answer`);
    }


    if (step.type === 'listening') {
      for (const level of ['A2', 'B1', 'B2'] as const) {
        if (!step.utterances[level]?.trim()) errors.push(`${path}.utterances.${level} is required`);
      }
      if (!step.question.trim()) errors.push(`${path}.question is required`);
      if (step.answers.length < 2) errors.push(`${path}.answers must contain at least two answers`);
      const answerIds = step.answers.map((answer) => answer.id);
      step.answers.forEach((answer, answerIndex) => {
        if (!answer.id.trim()) errors.push(`${path}.answers[${answerIndex}].id is required`);
        if (!answer.text.trim()) errors.push(`${path}.answers[${answerIndex}].text is required`);
      });
      if (new Set(answerIds).size !== answerIds.length) errors.push(`${path}.answers ids must be unique`);
      if (!answerIds.includes(step.correctAnswerId)) errors.push(`${path}.correctAnswerId must reference an answer`);
      if (step.audioSrcByLevel) {
        for (const level of ['A2', 'B1', 'B2'] as const) {
          const source = step.audioSrcByLevel[level];
          if (source !== undefined && !/^https:\/\//.test(source)) errors.push(`${path}.audioSrcByLevel.${level} must be an HTTPS URL`);
        }
      }
      if (step.masterySignals?.some((signal) => signal.signal !== 'context')) {
        errors.push(`${path}.masterySignals must use context evidence`);
      }
    }

    if ('pairs' in step) {
      const pairIds = step.pairs.map((pair) => pair.id);
      if (step.pairs.length < 2) errors.push(`${path}.pairs must contain at least two pairs`);
      step.pairs.forEach((pair, pairIndex) => {
        if (!pair.id.trim()) errors.push(`${path}.pairs[${pairIndex}].id is required`);
        validateLocalizedText(pair.left, `${path}.pairs[${pairIndex}].left`, errors);
        validateLocalizedText(pair.right, `${path}.pairs[${pairIndex}].right`, errors);
      });
      if (new Set(pairIds).size !== pairIds.length) errors.push(`${path}.pairs ids must be unique`);
    }

    if ('items' in step) {
      const itemIds = step.items.map((item) => item.id);
      step.items.forEach((item, itemIndex) => {
        if (!item.id.trim()) errors.push(`${path}.items[${itemIndex}].id is required`);
        validateLocalizedText(item.label, `${path}.items[${itemIndex}].label`, errors);
      });
      if (new Set(itemIds).size !== itemIds.length) errors.push(`${path}.items ids must be unique`);
      const correctIds = step.correctOrder;
      const exactSameSet = correctIds.length === itemIds.length
        && new Set(correctIds).size === correctIds.length
        && correctIds.every((id) => itemIds.includes(id));
      if (!exactSameSet) errors.push(`${path}.correctOrder must contain each item exactly once`);
    }

    if ('options' in step) {
      const optionIds = step.options.map((option) => option.id);
      step.options.forEach((option, optionIndex) => {
        if (!option.id.trim()) errors.push(`${path}.options[${optionIndex}].id is required`);
        validateLocalizedText(option.label, `${path}.options[${optionIndex}].label`, errors);
      });
      if (new Set(optionIds).size !== optionIds.length) errors.push(`${path}.options ids must be unique`);
      const answerId = step.type === 'choice' ? step.correctOptionId : step.bestOptionId;
      const answerKey = step.type === 'choice' ? 'correctOptionId' : 'bestOptionId';
      if (!optionIds.includes(answerId)) errors.push(`${path}.${answerKey} must reference an option`);
    }

    if ('relations' in step) {
      if (step.relations.length === 0) errors.push(`${path}.relations must not be empty`);
      step.relations.forEach((relation, relationIndex) => {
        const relationPath = `${path}.relations[${relationIndex}]`;
        if (!relationTypes.includes(relation.type)) errors.push(`${relationPath}.type is invalid`);
        if (!relation.from.trim()) errors.push(`${relationPath}.from is required`);
        if (!relation.to.trim()) errors.push(`${relationPath}.to is required`);
        if (relation.label) validateLocalizedText(relation.label, `${relationPath}.label`, errors);
      });
    }
  });

  return errors;
}
