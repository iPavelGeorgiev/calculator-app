import utilities from './utilities.js';

class History {
  constructor(modalHistorySel, modalHistoryComputationsSel) {
    this.modalHistorySel = modalHistorySel;
    this.modalHistoryComputationsSel = modalHistoryComputationsSel;
  }

  loadInitialHistory() {
    const storedComputations = localStorage.getItem('computations-history');

    if (!storedComputations) return;

    const computations = JSON.parse(storedComputations);
    computations.forEach((computation) => {
      const p = document.createElement('p');
      p.classList.add('computation');
      p.textContent = computation;
      this.modalHistoryComputationsSel.prepend(p);
    });
  }

  openModal() {
    this.modalHistorySel.classList.remove('hidden');
  }

  closeModal() {
    this.modalHistorySel.classList.add('hidden');
  }

  closeModalOnOverlayClick(e) {
    if (!e.target.classList.contains('modal-history')) return;
    this.modalHistorySel.classList.add('hidden');
  }
}

const modalHistorySel = document.querySelector('.modal-history');
const modalHistoryComputationsSel = document.querySelector('.modal-history-computations');
const btnCloseModal = document.querySelector('.btn-close-history');

const history = new History(modalHistorySel, modalHistoryComputationsSel);
history.loadInitialHistory();

modalHistorySel.addEventListener('click', history.closeModalOnOverlayClick.bind(history));
btnCloseModal.addEventListener('click', history.closeModal.bind(history));

export default history;
