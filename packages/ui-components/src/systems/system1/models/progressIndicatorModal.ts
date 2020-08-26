export interface ProgressIndicatorModalOpen {
    type: 'progressIndicatorModal';
    open: true;
    title?: string;
    body?: string;
}

export interface ProgressIndicatorModalClose {
    type: 'progressIndicatorModal';
    open: false;
}

export type ProgressIndicatorModal =
    ProgressIndicatorModalOpen |
    ProgressIndicatorModalClose;

export const open = (x: { title?: string, body?: string }): ProgressIndicatorModalOpen => ({
    type: 'progressIndicatorModal',
    open: true,
    title: x.title,
    body: x.body,
});

export const close = (x: {}): ProgressIndicatorModalClose => ({
    type: 'progressIndicatorModal',
    open: false,
});
