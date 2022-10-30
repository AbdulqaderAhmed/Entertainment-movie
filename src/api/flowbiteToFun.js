export const flowbitToFun = (flowPath) => {
  const flowbitScriptEl = document.createElement("script");
  flowbitScriptEl.setAttribute("src", flowPath);
  document.body.appendChild(flowbitScriptEl);
};
