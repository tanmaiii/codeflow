'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function AiSettings() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const [aiApiKey, setAiApiKey] = useState('');
  const [prompt, setPrompt] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ai')}</CardTitle>
        <CardDescription>{t('aiDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-row gap-2 items-center border-b pb-2 mb-2">
            <div className="bg-gray-100 rounded-xl py-2 px-2.5 w-fit">🤖</div>
            <TextHeading className="text-lg font-bold">Gemini Flash API Configuration</TextHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-500">{t('aiApiKey')}:</Label>
            <div className="space-y-2 flex flex-row gap-2 items-end relative">
              <Input
                className="h-13 w-full text-base rounded-md border-gray-300 mb-0"
                placeholder={t('aiApiKey')}
                value={aiApiKey}
                onChange={e => setAiApiKey(e.target.value)}
              />
              <Button
                variant="secondary"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-20 rounded-md"
              >
                {tCommon('test')}
              </Button>
            </div>
            <TextDescription>
              Get your API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Google AI Studio
              </a>
            </TextDescription>
          </div>
        </div>

        <div>
          <div className="flex flex-row gap-2 items-center border-b pb-2 mb-2">
            <div className="bg-yellow-100 rounded-xl py-2 px-2.5 w-fit">💬</div>
            <TextHeading className="text-lg font-bold">AI Review Prompt Template</TextHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-500">
              {t('aiReviewPromptTemplate')}:
            </Label>
            <Textarea
              className="min-h-[120px] w-full text-base rounded-md border-gray-300 mb-0 resize-none"
              placeholder={t('aiReviewPromptTemplate')}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={10}
            />
            <TextDescription>{t('aiReviewPromptTemplateDescription')}</TextDescription>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center justify-end">
          <Button variant="outline" className="w-fit">
            🔄️ {tCommon('reset')}
          </Button>
          <Button className="w-fit">💾 {tCommon('save')}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
