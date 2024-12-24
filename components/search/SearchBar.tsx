'use client';

import useClickOutside from '@/hooks/useClickOutside';
import Form from 'next/form';
import SearchButton from '@/components/search/SearchButton';
import SearchSuggestion from '@/components/search/SearchSuggestion';
import { Input } from '@/components/ui/input';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  suggestions?: string[];
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
};

export default function SearchBar({
  suggestions,
  onChange,
  className,
  defaultValue = '',
}: Readonly<SearchBarProps>) {
  const [value, setValue] = useState(defaultValue);
  const [inputFocus, setInputFocus] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const formRef = useRef<HTMLFormElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prevInputtedValue = useRef('');

  const changeValue = (value: string, callOnChange: boolean = true) => {
    setValue(value);

    if (onChange && callOnChange) {
      onChange(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!value) e.preventDefault();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
    prevInputtedValue.current = e.target.value;
  };

  const handleSuggestionClick = (suggestion: string) => {
    changeValue(suggestion);
    setSuggestionClicked(true);
  };

  const handleSuggestionsKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const isArrowUpOrDown = ['ArrowUp', 'ArrowDown'].includes(e.key);
    if (!suggestions || !isArrowUpOrDown) return;

    e.preventDefault();

    let newIndex = -1;

    if (e.key === 'ArrowUp') {
      newIndex =
        activeSuggestionIndex >= 0
          ? activeSuggestionIndex - 1
          : suggestions.length - 1;
    } else if (e.key === 'ArrowDown') {
      newIndex =
        activeSuggestionIndex < suggestions.length - 1
          ? activeSuggestionIndex + 1
          : -1;
    }

    setActiveSuggestionIndex(newIndex);

    if (newIndex !== -1) {
      changeValue(suggestions[newIndex], false);
    } else {
      changeValue(prevInputtedValue.current, false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setInputFocus(false);
      inputRef.current?.blur();
    }
  };

  const handleButtonFocus = () => {
    setInputFocus(false);
    setActiveSuggestionIndex(-1);
  };

  const suggestionExists = suggestions && suggestions.length > 0;
  const showSuggestions = inputFocus && suggestionExists;
  const disabled = !value;

  useEffect(() => {
    if (suggestionClicked) {
      formRef.current?.submit();
    }
  }, [suggestionClicked]);

  useClickOutside(divRef, () => {
    setInputFocus(false);
  });

  return (
    <div
      className={cn(
        'relative rounded-b-xl rounded-t-md transition-shadow duration-500',
        {
          'shadow-[0_0_4px_0_rgba(130,130,130,0.65)]': inputFocus,
        },
        className,
      )}
      ref={divRef}
      onKeyDown={handleSuggestionsKey}
    >
      <Form
        action="/search"
        className="flex"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          name="q"
          type="search"
          placeholder="Search Covid-19 Information..."
          autoComplete="off"
          className={cn(
            'h-12 flex-1 rounded-r-none border border-gray-300 bg-white focus-visible:ring-0',
            {
              'rounded-bl-none shadow-none': showSuggestions,
            },
          )}
          size={3}
          onChange={handleInputChange}
          onFocus={() => setInputFocus(true)}
          value={value}
          ref={inputRef}
          onKeyDown={handleEscapeKey}
        ></Input>
        <SearchButton
          className={cn('h-12 rounded-l-none', {
            'rounded-br-none': showSuggestions,
          })}
          disabled={disabled}
          onFocus={handleButtonFocus}
        />
      </Form>
      {showSuggestions && (
        <SearchSuggestion
          suggestions={suggestions}
          onClick={handleSuggestionClick}
          activeIndex={activeSuggestionIndex}
        />
      )}
    </div>
  );
}
