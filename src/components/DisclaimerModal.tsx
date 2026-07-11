interface DisclaimerModalProps {
  onClose: () => void
}

export function DisclaimerModal({ onClose }: DisclaimerModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85dvh] w-full max-w-sm overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-bold text-amber-950">Aviso legal</h2>
        <p className="mb-5 text-sm text-amber-800/70">Información sobre el contenido de esta app</p>

        <div className="space-y-4 text-sm leading-relaxed text-amber-900/90">
          <p>
            Las imágenes, ilustraciones y recursos visuales utilizados en esta aplicación
            provienen de contenido publicado en internet con fines informativos y de
            entretenimiento.
          </p>
          <p>
            <strong>No soy el autor ni el titular de los derechos</strong> de dichas imágenes.
            Esta app es un proyecto personal desarrollado con fines recreativos y educativos.
          </p>
          <p>
            <strong>No se obtiene ningún ingreso</strong> por el uso, reproducción o
            distribución de este material. No hay publicidad, suscripciones ni monetización
            asociada al contenido visual.
          </p>
          <p>
            Si eres titular de algún derecho y deseas que se retire algún material, puedes
            contactarme para atender tu solicitud de forma oportuna.
          </p>
          <p className="text-xs text-amber-800/60">
            Lotería mexicana es un juego tradicional de dominio cultural. Esta app no está
            afiliada a ninguna marca comercial ni entidad oficial.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-amber-600 py-3 font-semibold text-white active:bg-amber-700"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
