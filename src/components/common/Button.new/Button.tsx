import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO - color 옵션 추가
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'accent';
}

// TODO - 모바일 환경에서 hover 효과 변경하기
const Button = ({
  children,
  variant = 'soft',
  radius = 'medium',
  size = 'md',
  color = 'accent',
}: Props) => {
  return (
    <Container
      className={classNames(
        'button',
        {
          'color--accent': color === 'accent',
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
        }
      )}
    >
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  user-select: none;
  vertical-align: top;
  flex-shrink: 0;
  font-weight: 500;
  transition: color 100ms cubic-bezier(0.075, 0.82, 0.165, 1);

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

      &.button:hover {
        background-color: var(--accent-10);
      }

      &.button:active {
        background-color: var(--accent-11);
      }
    }
  }

  &.variant--soft {
    &.color--accent {
      background-color: var(--accent-a3);
      color: var(--accent-a11);

      &.button:hover {
        background-color: var(--accent-a4);
      }

      &.button:active {
        background-color: var(--accent-a5);
      }
    }
  }

  &.variant--surface {
    &.color--accent {
      background-color: var(--color-surface-accent);
      box-shadow: inset 0 0 0 1px var(--accent-a7);
      color: var(--accent-a11);

      &.button:hover {
        box-shadow: inset 0 0 0 1px var(--accent-a8);
      }

      &.button:active {
        box-shadow: inset 0 0 0 1px var(--accent-a9);
      }
    }
  }

  &.variant--outline {
    &.color--accent {
      box-shadow: inset 0 0 0 1px var(--accent-a8);
      color: var(--accent-a11);

      &.button:hover {
        background-color: var(--accent-a2);
      }

      &.button:active {
        background-color: var(--accent-a3);
      }
    }
  }

  &.variant--ghost {
    &.color--accent {
      color: var(--accent-11);

      &.button:hover {
        background-color: var(--accent-a3);
      }

      &.button:active {
        background-color: var(--accent-a4);
      }
    }
  }

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
    }

    &.size--lg {
      height: calc(48px * 1);
      padding: 0 16px;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0em;
    }

    &.size--xl {
      padding: 0 24px;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.0025em;
    }
  }

  &:where(.variant--ghost) {
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
