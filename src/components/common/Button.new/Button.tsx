import { forwardRef, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import LoadingSpinner from '~components/icons/LoadingSpinner';
import { noop } from '~lib/util/function';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO - color 옵션 추가
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'accent';
  loading?: boolean;
}

// TODO - 모바일 환경에서 hover 효과 변경하기
// TODO - fullsize일 때만 스피너 출현 시 텍스트가 이동되게 하고 그 외의 경우는 뜨지 않게 할 것
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
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!loading || disabled) {
        onClick?.(e);
      }
    },
    [disabled, loading, onClick]
  );

  const handleMouseDown: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!loading || disabled) {
          onMouseDown?.(e);
        }
      },
      [disabled, loading, onMouseDown]
    );

  const handleMouseUp: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!loading || disabled) {
        onMouseUp?.(e);
      }
    },
    [disabled, loading, onMouseUp]
  );

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!loading || disabled) {
          onMouseEnter?.(e);
        }
      },
      [disabled, loading, onMouseEnter]
    );

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        if (!loading || disabled) {
          onMouseMove?.(e);
        }
      },
      [disabled, loading, onMouseMove]
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
      <span
        className={classNames(
          'inner',
          'inline-flex',
          'justify-end',
          'items-center',
          'transition-all'
        )}
      >
        <LoadingSpinner className={classNames('loading-spinner')} />
        <span className={classNames('button-child')}>{children}</span>
      </span>
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

  .inner,
  .button-child {
    display: inline-flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    /* padding-left: 18px;
    width: calc(100% - 18px); */
  }

  .loading-spinner {
    position: absolute;
    opacity: 0;
    transition: opacity 200ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &::after {
      content: '';
    }
  }

  &.button-loading {
    .loading-spinner {
      opacity: 1;
    }

    .button-child {
      margin-left: 26px;
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
        left: 12px;
        border: 2px solid #fff;
        border-bottom-color: transparent;
      }
    }

    &.size--lg {
      height: calc(48px * 1);
      padding: 0 16px;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0em;
    }

    &.size--xl {
      height: calc(60px * 1);
      padding: 0 24px;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.0025em;
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
