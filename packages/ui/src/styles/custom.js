
export default function customStyle(themePalette, mode, direction){
  return {
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Open Sans',
        'sans-serif',
      ].join(','),
      title: {
        fontWeight: 600,
      },
      body2: {
        fontWeight: 500,
      },
      fontWeightMedium: 600,
    },
    shade: {
      light: '0 10px 15px -5px rgba(62, 57, 107, .07)',
    },
    glow: {
      light: `0 2px 20px -5px ${themePalette.palette.primary.main}`,
      medium: `0 2px 40px -5px ${themePalette.palette.primary.main}`,
      dark: `0 2px 40px 0px ${themePalette.palette.primary.main}`,
    },
    rounded: {
      small: '8px',
      medium: '12px',
      big: '20px',
    },
    shadows: mode === 'dark'
      ? [
        'none',
        '0px 1px 3px 0px rgba(50,50,50, 0.2),0px 1px 1px 0px rgba(50,50,50, 0.14),0px 2px 1px -1px rgba(50,50,50, 0.12)',
        '0px 1px 5px 0px rgba(50,50,50, 0.2),0px 2px 2px 0px rgba(50,50,50, 0.14),0px 3px 1px -2px rgba(50,50,50, 0.12)',
        '0px 1px 8px 0px rgba(50,50,50, 0.2),0px 3px 4px 0px rgba(50,50,50, 0.14),0px 3px 3px -2px rgba(50,50,50, 0.12)',
        '0px 2px 4px -1px rgba(50,50,50, 0.2),0px 4px 5px 0px rgba(50,50,50, 0.14),0px 1px 10px 0px rgba(50,50,50, 0.12)',
        '0px 3px 5px -1px rgba(50,50,50, 0.2),0px 5px 8px 0px rgba(50,50,50, 0.14),0px 1px 14px 0px rgba(50,50,50, 0.12)',
        '0px 3px 5px -1px rgba(50,50,50, 0.2),0px 6px 10px 0px rgba(50,50,50, 0.14),0px 1px 18px 0px rgba(50,50,50, 0.12)',
        '0px 4px 5px -2px rgba(50,50,50, 0.2),0px 7px 10px 1px rgba(50,50,50, 0.14),0px 2px 16px 1px rgba(50,50,50, 0.12)',
        '0px 5px 5px -3px rgba(50,50,50, 0.2),0px 8px 10px 1px rgba(50,50,50, 0.14),0px 3px 14px 2px rgba(50,50,50, 0.12)',
        '0px 5px 6px -3px rgba(50,50,50, 0.2),0px 9px 12px 1px rgba(50,50,50, 0.14),0px 3px 16px 2px rgba(50,50,50, 0.12)',
        '0px 6px 6px -3px rgba(50,50,50, 0.2),0px 10px 14px 1px rgba(50,50,50, 0.14),0px 4px 18px 3px rgba(50,50,50, 0.12)',
        '0px 6px 7px -4px rgba(50,50,50, 0.2),0px 11px 15px 1px rgba(50,50,50, 0.14),0px 4px 20px 3px rgba(50,50,50, 0.12)',
        '0px 7px 8px -4px rgba(50,50,50, 0.2),0px 12px 17px 2px rgba(50,50,50, 0.14),0px 5px 22px 4px rgba(50,50,50, 0.12)',
        '0px 7px 8px -4px rgba(50,50,50, 0.2),0px 13px 19px 2px rgba(50,50,50, 0.14),0px 5px 24px 4px rgba(50,50,50, 0.12)',
        '0px 7px 9px -4px rgba(50,50,50, 0.2),0px 14px 21px 2px rgba(50,50,50, 0.14),0px 5px 26px 4px rgba(50,50,50, 0.12)',
        '0px 8px 9px -5px rgba(50,50,50, 0.2),0px 15px 22px 2px rgba(50,50,50, 0.14),0px 6px 28px 5px rgba(50,50,50, 0.12)',
        '0px 8px 10px -5px rgba(50,50,50, 0.2),0px 16px 24px 2px rgba(50,50,50, 0.14),0px 6px 30px 5px rgba(50,50,50, 0.12)',
        '0px 8px 11px -5px rgba(50,50,50, 0.2),0px 17px 26px 2px rgba(50,50,50, 0.14),0px 6px 32px 5px rgba(50,50,50, 0.12)',
        '0px 9px 11px -5px rgba(50,50,50, 0.2),0px 18px 28px 2px rgba(50,50,50, 0.14),0px 7px 34px 6px rgba(50,50,50, 0.12)',
        '0px 9px 12px -6px rgba(50,50,50, 0.2),0px 19px 29px 2px rgba(50,50,50, 0.14),0px 7px 36px 6px rgba(50,50,50, 0.12)',
        '0px 10px 13px -6px rgba(50,50,50, 0.2),0px 20px 31px 3px rgba(50,50,50, 0.14),0px 8px 38px 7px rgba(50,50,50, 0.12)',
        '0px 10px 13px -6px rgba(50,50,50, 0.2),0px 21px 33px 3px rgba(50,50,50, 0.14),0px 8px 40px 7px rgba(50,50,50, 0.12)',
        '0px 10px 14px -6px rgba(50,50,50, 0.2),0px 22px 35px 3px rgba(50,50,50, 0.14),0px 8px 42px 7px rgba(50,50,50, 0.12)',
        '0px 11px 14px -7px rgba(50,50,50, 0.2),0px 23px 36px 3px rgba(50,50,50, 0.14),0px 9px 44px 8px rgba(50,50,50, 0.12)',
        '0px 11px 15px -7px rgba(50,50,50, 0.2),0px 24px 38px 3px rgba(850,50,50 0.14),0px 9px 46px 8px rgba(50,50,50, 0.12)',
      ]
      : [
        'none',
        '0px 1px 3px 0px rgba(80,80,80, 0.2),0px 1px 1px 0px rgba(80,80,80, 0.14),0px 2px 1px -1px rgba(80,80,80, 0.12)',
        '0px 1px 5px 0px rgba(80,80,80, 0.2),0px 2px 2px 0px rgba(80,80,80, 0.14),0px 3px 1px -2px rgba(80,80,80, 0.12)',
        '0px 1px 8px 0px rgba(80,80,80, 0.2),0px 3px 4px 0px rgba(80,80,80, 0.14),0px 3px 3px -2px rgba(80,80,80, 0.12)',
        '0px 2px 4px -1px rgba(80,80,80, 0.2),0px 4px 5px 0px rgba(80,80,80, 0.14),0px 1px 10px 0px rgba(80,80,80, 0.12)',
        '0px 3px 5px -1px rgba(80,80,80, 0.2),0px 5px 8px 0px rgba(80,80,80, 0.14),0px 1px 14px 0px rgba(80,80,80, 0.12)',
        '0px 3px 5px -1px rgba(80,80,80, 0.2),0px 6px 10px 0px rgba(80,80,80, 0.14),0px 1px 18px 0px rgba(80,80,80, 0.12)',
        '0px 4px 5px -2px rgba(80,80,80, 0.2),0px 7px 10px 1px rgba(80,80,80, 0.14),0px 2px 16px 1px rgba(80,80,80, 0.12)',
        '0px 5px 5px -3px rgba(80,80,80, 0.2),0px 8px 10px 1px rgba(80,80,80, 0.14),0px 3px 14px 2px rgba(80,80,80, 0.12)',
        '0px 5px 6px -3px rgba(80,80,80, 0.2),0px 9px 12px 1px rgba(80,80,80, 0.14),0px 3px 16px 2px rgba(80,80,80, 0.12)',
        '0px 6px 6px -3px rgba(80,80,80, 0.2),0px 10px 14px 1px rgba(80,80,80, 0.14),0px 4px 18px 3px rgba(80,80,80, 0.12)',
        '0px 6px 7px -4px rgba(80,80,80, 0.2),0px 11px 15px 1px rgba(80,80,80, 0.14),0px 4px 20px 3px rgba(80,80,80, 0.12)',
        '0px 7px 8px -4px rgba(80,80,80, 0.2),0px 12px 17px 2px rgba(80,80,80, 0.14),0px 5px 22px 4px rgba(80,80,80, 0.12)',
        '0px 7px 8px -4px rgba(80,80,80, 0.2),0px 13px 19px 2px rgba(80,80,80, 0.14),0px 5px 24px 4px rgba(80,80,80, 0.12)',
        '0px 7px 9px -4px rgba(80,80,80, 0.2),0px 14px 21px 2px rgba(80,80,80, 0.14),0px 5px 26px 4px rgba(80,80,80, 0.12)',
        '0px 8px 9px -5px rgba(80,80,80, 0.2),0px 15px 22px 2px rgba(80,80,80, 0.14),0px 6px 28px 5px rgba(80,80,80, 0.12)',
        '0px 8px 10px -5px rgba(80,80,80, 0.2),0px 16px 24px 2px rgba(80,80,80, 0.14),0px 6px 30px 5px rgba(80,80,80, 0.12)',
        '0px 8px 11px -5px rgba(80,80,80, 0.2),0px 17px 26px 2px rgba(80,80,80, 0.14),0px 6px 32px 5px rgba(80,80,80, 0.12)',
        '0px 9px 11px -5px rgba(80,80,80, 0.2),0px 18px 28px 2px rgba(80,80,80, 0.14),0px 7px 34px 6px rgba(80,80,80, 0.12)',
        '0px 9px 12px -6px rgba(80,80,80, 0.2),0px 19px 29px 2px rgba(80,80,80, 0.14),0px 7px 36px 6px rgba(80,80,80, 0.12)',
        '0px 10px 13px -6px rgba(80,80,80, 0.2),0px 20px 31px 3px rgba(80,80,80, 0.14),0px 8px 38px 7px rgba(80,80,80, 0.12)',
        '0px 10px 13px -6px rgba(80,80,80, 0.2),0px 21px 33px 3px rgba(80,80,80, 0.14),0px 8px 40px 7px rgba(80,80,80, 0.12)',
        '0px 10px 14px -6px rgba(80,80,80, 0.2),0px 22px 35px 3px rgba(80,80,80, 0.14),0px 8px 42px 7px rgba(80,80,80, 0.12)',
        '0px 11px 14px -7px rgba(80,80,80, 0.2),0px 23px 36px 3px rgba(80,80,80, 0.14),0px 9px 44px 8px rgba(80,80,80, 0.12)',
        '0px 11px 15px -7px rgba(80,80,80, 0.2),0px 24px 38px 3px rgba(80,80,80, 0.14),0px 9px 46px 8px rgba(80,80,80, 0.12)',
      ],
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor:
            mode === 'dark'
              ? '#292929'
              : '#FFFFFF',
          },
          rounded: {
            borderRadius: 8,
          },
        }
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: 'none',
          },
          root: {
            borderRadius: 4,
            fontWeight: 600,
          },
          sizeSmall: {
            padding: '7px 12px',
          },
        }
      },
      MuiTypography: {
        styleOverrides: {
          button: {
            fontWeight: 600,
          }
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            border:
            mode === 'dark'
              ? '1px solid rgba(255,255,255,0.32)'
              : '1px solid rgba(0,0,0,0.32)',
            borderRadius: 8,
            alignItems: 'center',
            transition: 'border 0.3s ease',
          },
          underline: {
            '&:after': {
              height: 'calc(100% + 1px)',
              borderRadius: 8,
              bottom: -1,
              boxShadow: `0 0 1px ${themePalette.palette.primary.main}`,
            },
            '&:before': {
              display: 'none',
            },
          },
          input: {
            padding: 10,
            fontSize: 14,
          },
          multiline: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 24,
          }
        },
      },
      // MuiInputLabel: {
      //   styleOverrides: {
      //     formControl: {
      //       top: 12,
      //       left: 10,
      //       transform: 'translate(0, 22px) scale(1)',
      //     },
      //     shrink: {
      //       transform: 'translate(0, 13px) scale(0.7)',
      //       zIndex: 1,
      //     },
      //     filled: {
      //       transform: 'translate(2px, 6px) scale(1)',
      //       '&$shrink': {
      //         transform: 'translate(0px, -6px) scale(0.75)',
      //       },
      //     },
      //     outlined: {
      //       transform: 'translate(2px, 6px) scale(1)',
      //       '&$shrink': {
      //         transform: 'translate(4px, -16px) scale(0.75)',
      //       },
      //     }
      //   },
      // },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
          }
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            paddingLeft: 5,
          }
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          icon: {
            top: 'calc(50% - 10px)',
            right: 0,
          },
          selectMenu: {
            paddingRight: '24px',
          },
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& label + div': {
              alignItems: 'flex-end',
              '&[role="radiogroup"]': {
                alignItems: 'flex-start',
              },
              paddingBottom: 4,
              '& input, > div, > select': {
                padding: '24px 8px 0',
              },
            },
          }
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            alignItems: 'flex-end',
            paddingLeft: 0,
            paddingRight: 0,
            '& button': {
              width: 32,
              height: 32,
              padding: 0,
            },
            '& p': {
              minWidth: 24,
              lineHeight: '16px',
            },
            '& svg': {
              top: 3,
              position: 'relative',
            },
          },
          positionStart: {
            marginLeft: 0,
          },
          positionEnd: {
            marginRight: 0,
          },
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          }
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom:
            mode === 'dark'
              ? '1px solid #636363'
              : `1px solid ${themePalette.palette.primary.light}`,
          },
          head: {
            fontWeight: 600,
          }
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            whiteSpace: 'nowrap',
          }
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
          bar: {
            borderRadius: 16,
          },
          colorPrimary: {
            backgroundColor: mode === 'dark' ? '#616161' : '#ededed',
          }
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          input: {
            marginRight: 32,
            marginLeft: 8,
          },
          selectRoot: {
            marginLeft: 0,
            marginRight: 0,
          },
          select: {
            paddingRight: 24,
          },
          selectIcon: {
            top: 4,
          }
        },
      },
      MuiPickersToolbar: {

        styleOverrides: {
          toolbar: {
            borderRadius: 0,
            boxShadow: 'inset 0 -30px 120px -30px rgba(0, 0, 0, 0.3)',
          }
        },
      },
      MuiPickersClock: {
        styleOverrides: {
          clock: {
            backgroundColor: 'none',
            border: `1px solid ${themePalette.palette.primary.main}`,
          }
        },
      },
      MuiPickersClockPointer: {
        styleOverrides: {
          thumb: {
            boxShadow: `0 1px 10px 0px ${
              themePalette.palette.primary.main
            }`,
          }
        },
      },
      MuiPickerDTTabs: {
        styleOverrides: {
          tabs: {
            backgroundColor: 'transparent',
            color: themePalette.palette.primary.main,
          }
        },
      },
      MuiExpansionPanel: {
        styleOverrides: {
          root: {
            '&:first-child': {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
            '&:last-child': {
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
            '&$expanded': {
              borderRadius: 16,
              boxShadow: `0px 0px 0px 1px ${themePalette.palette.primary.main}`,
              '& + div': {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            },
          }
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            position: 'relative',
            marginBottom: 32,
            '&:after': {
              content: '""',
              position: 'absolute',
              height: 4,
              background: themePalette.palette.primary.main,
              bottom: 0,
              left: 16,
              right: 16,
            },
            '& h2': {
              color:
              mode === 'dark'
                ? themePalette.palette.primary.light
                : themePalette.palette.primary.dark,
            },
          }
        },
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            '@media (min-width: 960px)': {
              borderRadius: 8,
            },
          }
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
          colorPrimary: {
            backgroundColor:
            mode === 'dark'
              ? themePalette.palette.primary.dark
              : themePalette.palette.primary.main,
          }
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
          indicator: {
            borderRadius: '10px 10px 0 0',
            height: 4,
          },
        }
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
            borderRadius: 8,
            boxShadow: 'none',
            border: `1px solid ${themePalette.palette.secondary.main}`,
          },
        }
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            height: 32,
            boxShadow: 'none !important',
            '&$selected': {
              color: themePalette.palette.secondary.main,
              backgroundColor: themePalette.palette.secondary.light,
            },
          },
        }
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          filterPaper: {
            maxWidth: 'none',
          },
        }
      },
      MUIDataTableToolbarSelect: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backgroundColor:
            mode === 'dark'
              ? themePalette.palette.secondary.dark
              : themePalette.palette.secondary.light,
          },
          title: {
            padding: direction === 'rtl' ? '0 26px 0 0' : '0 0 0 26px',
          },
          deleteIcon: {
            color: mode === 'dark' ? '#FFF' : '#000',
          },
        }
      },
      MuiChip: {
        styleOverrides: {
          deleteIcon: {
            margin: direction === 'rtl' ? '0 -8px 0 4px' : '0 4px 0 -8px',
          },
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            direction: 'ltr',
          },
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            flex: 1,
          },
        }
      },
    }
  };
}
