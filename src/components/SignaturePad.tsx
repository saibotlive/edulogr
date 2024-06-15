import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad: React.FC<{ onSave: (signature: string) => void }> = ({ onSave }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const saveSignature = () => {
    if (sigCanvas.current) {
      onSave(sigCanvas.current.toDataURL());
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={saveSignature}>Save Signature</button>
    </div>
  );
};

export default SignaturePad;
