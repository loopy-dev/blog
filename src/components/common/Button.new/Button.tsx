import React, { forwardRef, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Spinner from '~components/common/Spinner';
import { noop } from '~lib/util/function';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO - color 옵션 추가
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'accent';
  loading?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

// TODO - 모바일 환경에서 hover 효과 변경하기
const Button = (
  {
    children,
    variant = 'soft',
    radius = 'medium',
    size = 'md',
    color = 'accent',
    loading = false,
    onClick = noop,
    onMouseDown = noop,
    onMouseLeave = noop,
    onMouseEnter = noop,
    onMouseMove = noop,
    onMouseUp = noop,
    disabled,
    leftContent,
    rightContent,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!disabled) {
        onClick?.(e);
      }
    },
    [disabled, onClick]
  );

  const handleMouseDown: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!disabled) {
          onMouseDown?.(e);
        }
      },
      [disabled, onMouseDown]
    );

  const handleMouseUp: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!disabled) {
        onMouseUp?.(e);
      }
    },
    [disabled, onMouseUp]
  );

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!disabled) {
          onMouseEnter?.(e);
        }
      },
      [disabled, onMouseEnter]
    );

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!disabled) {
          onMouseMove?.(e);
        }
      },
      [disabled, onMouseMove]
    );

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!loading) {
          onMouseLeave?.(e);
        }
      },
      [loading, onMouseLeave]
    );

  return (
    <Container
      ref={ref}
      disabled={disabled}
      className={classNames(
        'button',
        { 'button-loading': loading },
        {
          'color--accent': color === 'accent' && !loading,
          'color--accent-loading': color === 'accent' && loading,
        },
        {
          'size--sm': size === 'sm',
          'size--md': size === 'md',
          'size--lg': size === 'lg',
          'size--xl': size === 'xl',
        },
        {
          'variant--solid': variant === 'solid',
          'variant--soft': variant === 'soft',
          'variant--surface': variant === 'surface',
          'variant--outline': variant === 'outline',
          'variant--ghost': variant === 'ghost',
        },
        {
          'radius--none': radius === 'none',
          'radius--small': radius === 'small',
          'radius--medium': radius === 'medium',
          'radius--large': radius === 'large',
          'radius--full': radius === 'full',
        },
        'transition-all'
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <div className={classNames('spinner-wrapper')}>
        <Spinner className={classNames('loading-spinner')} />
      </div>
      <div className={classNames('content-wrapper')}>
        {leftContent && (
          <span className={classNames('side-content')}>{leftContent}</span>
        )}
        <span className={classNames('inner', { 'inner-loading': loading })}>
          {children}
        </span>
        {rightContent && (
          <span className={classNames('side-content')}>{rightContent}</span>
        )}
      </div>
    </Container>
  );
};

export default forwardRef(Button);

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
  vertical-align: top;
  flex-shrink: 0;
  font-weight: 500;
  transition: color 200ms cubic-bezier(0.075, 0.82, 0.165, 1);

  .content-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .inner {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .spinner-wrapper {
    position: absolute;
    display: none;
    align-items: center;

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid;
      border-bottom-color: transparent;
    }

    &::after {
      content: '';
    }
  }

  &.button-loading {
    .spinner-wrapper {
      display: flex;
    }

    .inner {
      visibility: hidden;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.radius--none {
    border-radius: 0;
  }

  &.radius--small {
    border-radius: 3px;
  }

  &.radius--medium {
    border-radius: 6px;
  }

  &.radius--large {
    border-radius: 9px;
  }

  &.radius--full {
    border-radius: 9999px;
  }

  &.variant--solid {
    &.color--accent {
      background-color: var(--accent-9);
      color: var(--accent-9-contrast);

      &.button:hover:not(:disabled) {
        background-color: var(--accent-10);
      }

      &.button:active:not(:disabled) {
        background-color: var(--accent-11);
      }
    }

    &.color--accent-loading {
      background-color: var(--accent-a8);
      color: var(--accent-9-contrast);
    }

    &:disabled {
      color: var(--gray-a8);
      background-color: var(--gray-a3);
      filter: none;
    }
  }

  &.variant--soft {
    &.color--accent {
      background-color: var(--accent-a3);
      color: var(--accent-a11);

      &.button:hover:not(:disabled) {
        background-color: var(--accent-a4);
      }

      &.button:active:not(:disabled) {
        background-color: var(--accent-a5);
      }
    }

    &.color--accent-loading {
      background-color: var(--accent-a3);
      color: var(--accent-a8);
    }

    &:disabled {
      color: var(--gray-a8);
      background-color: var(--gray-a3);
      filter: none;
    }
  }

  &.variant--surface {
    &.color--accent {
      background-color: var(--color-surface-accent);
      box-shadow: inset 0 0 0 1px var(--accent-a7);
      color: var(--accent-a11);

      &.button:hover:not(:disabled) {
        box-shadow: inset 0 0 0 1px var(--accent-a8);
      }

      &.button:active:not(:disabled) {
        box-shadow: inset 0 0 0 1px var(--accent-a9);
      }
    }

    &.color--accent-loading {
      background-color: var(--color-surface-accent);
      box-shadow: inset 0 0 0 1px var(--accent-a6);
      color: var(--accent-a8);
    }

    &:disabled {
      color: var(--gray-a8);
      box-shadow: inset 0 0 0 1px var(--gray-a6);
      background-color: var(--gray-a2);
    }
  }

  &.variant--outline {
    &.color--accent {
      box-shadow: inset 0 0 0 1px var(--accent-a8);
      color: var(--accent-a11);

      &.button:hover:not(:disabled) {
        background-color: var(--accent-a2);
      }

      &.button:active:not(:disabled) {
        background-color: var(--accent-a3);
      }
    }

    &.color--accent-loading {
      box-shadow: inset 0 0 0 1px var(--accent-a6);
      color: var(--accent-a8);
    }

    &:disabled {
      color: var(--gray-a8);
      box-shadow: inset 0 0 0 1px var(--gray-a7);
      background-color: transparent;
    }
  }

  &.variant--ghost {
    &.color--accent {
      color: var(--accent-11);

      &.button:hover:not(:disabled) {
        background-color: var(--accent-a3);
      }

      &.button:active:not(:disabled) {
        background-color: var(--accent-a4);
      }
    }

    &.color--accent-loading {
      color: var(--accent-a8);
    }

    &:disabled {
      color: var(--gray-a8);
      background-color: transparent;
    }
  }

  /** size */
  &:where(:not(.variant--ghost)) {
    &.size--sm {
      height: calc(24px * 1);
      padding: 0 8px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.0025em;

      .loading-spinner {
        width: 14px;
        height: 14px;
      }
    }

    &.size--md {
      height: calc(32px * 1);
      padding: 0 12px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0em;

      .loading-spinner {
        width: 18px;
        height: 18px;
      }
    }

    &.size--lg {
      height: calc(48px * 1);
      padding: 0 16px;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0em;

      .loading-spinner {
        width: 22px;
        height: 22px;
      }
    }

    &.size--xl {
      height: calc(60px * 1);
      padding: 0 24px;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.0025em;

      .loading-spinner {
        width: 24px;
        height: 24px;
      }
    }
  }

  &:where(.variant--ghost) {
    font-weight: 400;

    &.size--sm {
      padding: 4px 8px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.0025em;
    }

    &.size--md {
      padding: 4px 8px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0em;
    }

    &.size--lg {
      padding: 6px 12px;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0em;
    }

    &.size--xl {
      padding: 8px 16px;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.0025em;
    }
  }
`;
