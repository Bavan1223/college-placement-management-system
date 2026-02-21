# 🚀 YIT PLACEMENT Kubernetes Deployment

This repository contains Kubernetes manifests for deploying a **YIT PLACEMENT (YENEPOYA PLACEMENT)** application consisting of:
- **Frontend** (React + Vite + Nginx)
- **Backend** (Node.js + Express + Mongoose)
- **MongoDB** (StatefulSet with persistent storage)

---

## 🗂 Folder Structure

```
kubernetes/
├── namespace.yaml
├── kind-config.yaml
├── mongo-configmap.yaml
├── mongo-secret.yaml
├── mongo-statefulset.yaml
├── mongo-service.yaml
├── backend-config.yaml
├── backend-secret.yaml
├── backend-deployment.yaml
├── backend-service.yaml
├── frontend-config.yaml
├── frontend-deployment.yaml
├── frontend-service.yaml
```

---

## ⚙️ Create Kubernetes Cluster (Kind)

```bash
kind create cluster --name YIT PLACEMENT-cluster --config kind-config.yaml
```

Access frontend via:
```
http://<EC2-IP>:30080
```

---

## 🧩 Create Namespace

```bash
kubectl apply -f namespace.yaml
kubectl get ns
```

---

## 🗝 Deploy MongoDB

```bash
kubectl apply -f mongo-configmap.yaml -f mongo-secret.yaml -f mongo-statefulset.yaml -f mongo-service.yaml
kubectl get pods -n YIT PLACEMENT
```

---

## 🧠 Deploy Backend

```bash
kubectl apply -f backend-config.yaml -f backend-secret.yaml -f backend-deployment.yaml -f backend-service.yaml
kubectl get pods -n YIT PLACEMENT
kubectl logs -n YIT PLACEMENT deployment/backend
```

---

## 🌐 Deploy Frontend

```bash
kubectl apply -f frontend-config.yaml -f frontend-deployment.yaml -f frontend-service.yaml
kubectl get svc -n YIT PLACEMENT
```

Access:
```
http://<EC2-IP>:30080
```

---

## 🔁 Update or Restart Deployments

```bash
kubectl apply -f backend-config.yaml -f backend-secret.yaml
kubectl rollout restart deployment backend -n YIT PLACEMENT
kubectl apply -f frontend-config.yaml
kubectl rollout restart deployment frontend -n YIT PLACEMENT
```

---

## 🧾 Verify Communication

```bash
kubectl logs -f -n YIT PLACEMENT deployment/backend
```

1. Open frontend (`http://<EC2-IP>:30080`)
2. Test login or API call
3. Check backend logs

---

## 🧰 Troubleshooting

| Issue                          | Fix                                                 |
| ------------------------------ | --------------------------------------------------- |
| Backend can't connect to Mongo | Use `mongo-0.mongo.YIT PLACEMENT.svc.cluster.local:27017`    |
| 504 or timeout                 | Verify backend service name and port                |
| NodePort not accessible        | Check Kind port mapping / EC2 SG rules              |
| Config changes not applied     | `kubectl rollout restart deployment <name> -n YIT PLACEMENT` |

---

## 🧹 Delete All Resources

```bash
kubectl delete ns YIT PLACEMENT
```

---
